const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    shippingInfo: {
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        pincode: {
            type: String,
            required: true
        },
        phoneNo: {
            type: Number,
            required: true
        }
    },
    orderItems: [{
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: true
        },
        // Product:{
        //     type:mongoose.Schema.Types.ObjectId,
        //     ref:"products",
        //     required:true
        // }
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    paymentInfo: {
        id: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        paidAt: {
            type: Date,
            required: true
        },
        itemPrice: {
            type: Number,
            required: true,
            default: 0,
        },
        taxPrice: {
            type: Number,
            required: true,
            default: 0,
        },
        shippingPrice: {
            type: Number,
            required: true,
            default: 0,
        },
        totalPrice: {
            type: Number,
            required: true,
            default: 0,
        },
        orderStatus: {
            type: String,
            required: true,
            default: "processing"
        },
        deliveryAt: {
            type: Date,
            default: Date.now()
        },
        createdAt: {
            type: Date,
            default: Date.now()
        }
    },
});

module.exports = mongoose.model("Order", orderSchema);
