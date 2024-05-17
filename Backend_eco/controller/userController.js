const UserData = require("../modal/Usermodal");
const ErrorHandle = require("../utils/ErrorHandler");
const bcrypt = require("bcryptjs");
const setToken = require("../utils/jwttoken")
const sendEmail = require("../utils/sendEmail.js")
const crypto = require("crypto")
const createUser = async (req, res, next) => {
    try {
        const { name, email, password, phone } = req.body
        const useremail = UserData.findOne({ email })
        if (!useremail) {
            return next(new ErrorHandle("user already exist ", 404))
        }
        const createuserdata = await UserData.create({
            name,
            email,
            password,
            phone,
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
// forget password
const Forgetpassword = async (req, res, next) => {
    try {
        const userdetail = await UserData.findOne({ email: req.body.email })

        if (!userdetail) {
            return next(new ErrorHandle("user is not found ", 404))
        }
        const resetToken = userdetail.getResetPasswordToken()
        userdetail.resetPasswordToken = resetToken;
        userdetail.resetPasswordExpire = Date.now() + 600000;
        await userdetail.save({ validateBeforsave: false });
        const resetpasswordurl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
        const message = `your password reset token is : \n\n ${resetpasswordurl}\n\n if you have
    not requested this email then ,Please ignore it  `;
        try {
            await sendEmail({
                email: userdetail.email,
                subject: "eccomerce password recovery",
                message,
            });
            res.status(200).json({
                success: true,
                message: `sent email ${userdetail.email} sucessfully`,
            });
        } catch (error) {
            userdetail.resetPasswordToken = undefined;
            userdetail.resetPasswordExpire = undefined;
            await userdetail.save({
                validateBeforeSave: false
            })
            return next(new ErrorHandle(error.message, 500));
        }
    } catch (error) {
        return next(new ErrorHandle("the forget password is not work ", 400))
    }
}
// reset password
const resetPassword = async (req, res, next) => {
    try {

        if (!req.params.token) {
            return next(new ErrorHandle("Reset password token is missing."));

        }
        // creating reset token
        const resetPasswordToken = crypto.createHash("sha256")
            .update(req.params.token)
            .digest("hex");
        console.log(resetPasswordToken)
        const userToken = await UserData.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });
        console.log(userToken);
        if (!userToken) {
            return next(new ErrorHandle("the Reset password Token is invalid or has been Expired "));

        }
        if (req.body.password !== req.body.confirmPassword) {
            return next(new ErrorHandle("Password does not match."));
        }
        userToken.password = req.body.password;
        userToken.resetPasswordToken = undefined;
        userToken.resetPasswordExpire = undefined;

        await userToken.save();

        setToken(userToken, 200, res)
    } catch (error) {
        return next(new ErrorHandle("the reset password is not working"), 400)
    }
}
const profile = async (req, res, next) => {
    try {
        const userprofile = await UserData.findById(req.user.id);

        if (!userprofile) {
            return res.status(404).json({ error: "User profile not found." });
        }
        res.status(200).json({
            success: true,
            userprofile
        })
    } catch (error) {
        return next(new ErrorHandle("profile is not access ", 400))
    }
}
// update user password
const updateprofilepassword = async (req, res, next) => {
    try {
        const userpassword = await UserData.findById(req.user.id);

        if (!userpassword) {
            return next(new ErrorHandle("Please enter correct credentials", 400));
        }
        const securedpassword = userpassword.password;
        console.log(securedpassword)
        const validPassword = await bcrypt.compare(req.body.oldPassword, securedpassword);
        if (!validPassword) {
            return next(new ErrorHandle("oldpassword is not correct", 400));
        }
        if (req.body.newPassword !== req.body.confirmPassword) {
            return next(new ErrorHandle("password is does not matched", 400));
        }
        userpassword.password = req.body.newPassword;
        await userpassword.save();

        setToken(userpassword, 200, res)
    } catch (error) {
        return next(new ErrorHandle("update passwors is not access ", 400))
    }
}

const updateProfileid = async (req, res, next) => {
    try {
        const newUserData = {
            name: req.body.name,
            email: req.body.email
        };
        const userprofile = await UserData.findByIdAndUpdate(req.user.id, newUserData, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        })
        res.status(200).json({
            success: true,
        })
    } catch (error) {
        return next(new ErrorHandle("updateProfile is not access ", 400))
    }
}
// get all  profile data for user(admin)
const getAllUser = async (req, res, next) => {
    try {
        const userdetail = await UserData.find();

        res.status(200).json({
            success: true,
            userdetail,
        })
    } catch (error) {
        return next(new ErrorHandle("getAllUser is not access ", 400))
    }
}
// get single data for admin
const getSingleUser = async (req, res, next) => {
    try {
        const userdetail = await UserData.findById(req.params.id);
        if (!userdetail) {

            return next(new ErrorHandle(`the user does not exist in this id ${req.params.id}`))
        }
        res.status(200).json({
            success: true,
            userdetail,
        })
    } catch (error) {
        return next(new ErrorHandle("getAllUser (admin) is not access ", 400))
    }
}
const updateUserRole = async (req, res, next) => {
    try {
        const updaterole = {
            name: req.body.name,
            email: req.body.email,
            role: req.body.role,
        }
        console.log(updaterole)
        const roleUpdate = await UserData.findByIdAndUpdate(req.params.id, updaterole, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });

        res.status(200).json({
            success: true,
        })
    } catch (error) {
        return next(new ErrorHandle("update user role function (admin) is not access ", 400))
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const deletedata = await UserData.findById(req.params.id);
        if (!deletedata) {
            return next(new ErrorHandle(`user is doest not exits of this id ${req.params.id} `, 400));

        }
        await deletedata.deleteOne();;
        res.status(200).json({
            success: true,
            message: "the account is successfully deleted",
        })
    } catch (error) {
        return next(new ErrorHandle("delete user is not access", 400));

    }
}

module.exports = {
    createUser
    , Loginuser,
    Logout,
    Forgetpassword,
    resetPassword,
    profile,
    updateprofilepassword,
    updateProfileid,
    getAllUser,
    getSingleUser,
    updateUserRole,
    deleteUser
}
