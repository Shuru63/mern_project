const ErrorHandle = require("../utils/ErrorHandler");
const jwt = require("jsonwebtoken")
const userData = require("../modal/Usermodal")
const Authentication = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        // console.log(token);
        if (!token) {
            return next(new ErrorHandle("Please login access the resource ", 401));
        }
        const decodeddata = jwt.verify(token, process.env.JWT_SECRET)
        req.uuserData=userData.findById(decodeddata._id);
    
        next();
    }
    catch (error) {
        return next(new ErrorHandle("Internal server error in cookie handling", 500));
    }

};

module.exports = Authentication;