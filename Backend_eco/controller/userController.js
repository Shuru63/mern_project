const UserData = require("../modal/Usermodal");
const ErrorHandle = require("../utils/ErrorHandler");
const bcrypt = require("bcryptjs");
const setToken = require("../utils/jwttoken")
const createUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body
        const useremail = UserData.findOne({ email })
        if (!useremail) {
            return next(new ErrorHandle("user already exist ", 404))
        }
        const createuserdata = await UserData.create({
            name,
            email,
            password,
            avatar: {
                user_id: "user1",
                url: "www.hm.in"
            },
        });
        // this code is minimize 
        // const token = createuserdata.getJwTToken();
        // res.status(200).json({
        //     success: true,
        //     data: createuserdata,
        //     token
        // })
        setToken(createuserdata, 201, res)
    } catch (error) {
        return next(new ErrorHandle("please enter proper details", 404))
    }
}

const Loginuser = async (req, res, next) => {
    let { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandle("please fill email and password", 500))
    }
    try {
        let userinfo = await UserData.findOne({ email });
        if (!userinfo) {
            return next(new ErrorHandle("Please enter correct credentials", 400));
        }
        const securedpassword = userinfo.password;

        const validPassword = await bcrypt.compare(password, securedpassword);
        if (!validPassword) {
            return next(new ErrorHandle("Please enter correct credentials", 400));
        }

        // const token = userinfo.getJwTToken();
        // res.status(200).json({ success: true
        // ,message:"log in successfully" ,
        // token });
        setToken(userinfo, 200, res)
    } catch (error) {
        return next(new ErrorHandle("internal server in login api", 400))
    }
}

const Logout = async (req, res, next) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
        });
        res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    } catch (error) {
        return next(new ErrorHandle("Internal server error in logout API", 500));
    }
};
module.exports = {
    createUser
    , Loginuser,
    Logout
}
