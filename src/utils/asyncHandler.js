const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        promise.resolve().catch(err => 
            next(err));
            
}
}

export {asyncHandler}





 // make raper fn and used everywhgere
// const asyncHandler = (fn) => (req, res, next) => {
//     try{
//            await fn(req, res, next)

//     } catch (error) {
//         req.status(err.code || 500 ).json({
//             success: false,
//             message: err.message 
//         })

//     }


// }