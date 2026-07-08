import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js';
import {user} from '../models/user.model.js';
import{uploadOnCloudinary} from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';
const registerUser = asyncHandler(async (req, res) => {
    // step 1 get user details from frontend
    // step 2 validate user details not empty
    // step 3 check if user already exists : username,emails
    // check for images , check for avatar
    // upload image to cloudinary , avatar
    // create  user object - create enty in db
    // remove password and refresh token from response
    // check for user creation
    // return response


    const {fullName , email , username , password }= req.body // step 1 get user details from frontend
    console.log("email",email);

    if(  // step 2 validate user details not empty
        [fullName , email , username , password].some((field) => field?.trim()==="")
    ){
       throw new ApirError(400,"All fields are required")

    }

   const existingUser = User.findone({  // checking if user already exists in the database
        $or:[
            {username}
,           {email}]
    })
    if(existingUser){
        throw new ApiError(409,"user with email or username already exists")
    }
    
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path;
    
    if(!avatarLocalPath){ // check for images , check for avatar
        throw new ApiError(400,"Avatar file is required")
        
    }
    // upload image to cloudinary , avatar

  const avatar = await uploadOnCloudinary(avatarLocalPath)
  const coverImage = await uploadOnCloudinary(coverImageLocalPath)

 // check avatar field
 if(!avatar){
    throw new ApiError(400,"Avatar file is required")

 }
   // enter database entnty
  const user = await User.create({
    fullName,
    avatar:avatar.url,
    coverImage:coverImage?.url || "",
    email,
    password,
    username:username.toLowerCase()
   })

   const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
   )
   if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user")
   }
   return res.status(201).json(
    new ApiResponse(200, createdUser , "User registered successfully ")
      
   )

})


export {registerUser}