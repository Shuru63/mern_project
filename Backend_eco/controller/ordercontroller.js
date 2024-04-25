const placeOrder = require("../modal/Ordermodal");
const Productmodal = require("../modal/productmodal");
const ErrorHandle = require("../utils/ErrorHandler");

const newOrder = async (req, res, next) => {
    // try {
        const {
            shippinginfo,
            orderItem,
            paymentInfo,
            itemprice,
            taxprice,
            shippingprice,
            totalprice,
        } = req.body;

        const orderbyuser = await placeOrder.create({
            shippingInfo: shippinginfo,
            orderItem: orderItem,
            paymentInfo: paymentInfo,
            itemprice: itemprice,
            taxprice: taxprice,
            shippingprice: shippingprice,
            totalprice: totalprice,
            paidAt: Date.now(),
            user: req.user._id,
        });

        res.status(200).json({
            success: true,
            orderbyuser,
        });
    // } catch (error) {

    //     return next(new ErrorHandle("Error in creating a new order", 400));
    // }
};

module.exports = {
    newOrder
};
