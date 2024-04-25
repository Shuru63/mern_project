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
        req.user = await userData.findById(decodeddata.id);
        next();
    }
    catch (error) {
        return next(new ErrorHandle("Internal server error in cookie handling", 500));
    }

};

const AuthorizeRole = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !req.user.role) {
            return next(new ErrorHandle("User role not provided", 403));
        }

        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandle(`ROLE: ${req.user.role} is not allowed to access the resource`, 403));
        }
        
        next();
    };
};
module.exports = { Authentication, AuthorizeRole };