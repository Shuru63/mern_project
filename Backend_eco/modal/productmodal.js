const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the name"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Please enter the description"]
    },
    price: {
        type: String,
        required: [true, "Please enter the price"],
        maxlength: [8, "Price cannot exceed 8 characters"]
    },
    Rating: {
        type: Number,
        default: 0
    },
    image: [
        {
            publicId: { type: String, required: [true, "Please enter the publicId"] },
            url: { type: String, required: [true, "Please enter the url"] }
        }
    ],
    categories: {
        type: String,
        required: [true, "Please enter the category"]
    },
    stocks: {
        type: Number,
        required: [true, "Please enter the stock"],
        maxlength: [4, "Stocks cannot exceed 4 characters"], 
        default: 0
    },
    Reviews: [{
        user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true
    },
        name: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        comment: {
            type: String,
            required: true
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now 
    }
});

module.exports = mongoose.model("Product", ProductSchema);
