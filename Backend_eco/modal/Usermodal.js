const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');

const dotenv = require('dotenv');
const path = require('path');
const configPath = path.resolve(__dirname, '../Backend_eco/config/config.env');
dotenv.config({ path: configPath });

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "enter the user name"],
        maxLength: [30, "Name cannot exceed more than 30 character"],
        minLenght: [4, "name is not less than 4 character"]
    },
    phone:{
        type: Number,
        require: [true, "enter the phone number"],
        unique: true,
    },
    email: {
        type: String,
        require: [true, "enter the email"],
        unique: true,
        validate: [validator.isEmail, "please enter email"]
    },
    password: {
        type: String,
        require: [true, "enter the password"],
        minLenght: [8, "password is not less than 8 character"],
        select: true
    },
    avatar: {
        user_id: {
            type: String,
            require: true
        },
        url: {
            type: String,
            require: true
        }
    },
    role: {
        type: String,
        default: "user"
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
});
// password incryption function
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10)
})
// generate jwt tokens and store in cookie
UserSchema.methods.getJwTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}
// genertaing token for forgate password
UserSchema.methods.getResetPasswordToken = function () {
    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    // Hash the reset token
    const hashedToken = crypto.createHash("sha256")
    .update(resetToken)
    .digest("hex");

    this.resetPasswordToken = hashedToken;
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 minutes expiration

    return resetToken;
};

module.exports = mongoose.model("Userdata", UserSchema)