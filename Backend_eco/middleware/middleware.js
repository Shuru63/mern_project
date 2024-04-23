const errorhandle = require("../utils/ErrorHandler")

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 400;
    err.message = err.message || "Internal server error";

    if (err.name == "CastError") {
        const message = `resourece is not found ${err.path}`;
        err=new errorhandle(message,400)

    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message

    });
};