const nodemailer = require("nodemailer")

const sendEmail = async (option) => {
    const transporter = nodemailer.createTransport({
        services: process.env.SMPT_SERVICE,
        host: process.env.SMTP_SERVER,
        port: 587,
        secure: false,
        auth: {
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD
        }
    });
    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: option.email,
        subject: option.subject,
        text: option.message,
    };
    transporter.sendMail(mailOptions)
};


module.exports = sendEmail;