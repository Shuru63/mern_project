const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the name"]
    },
    description: {
        type: String,
        required: [true, "Please enter the description"]
    },
    price: {
        type: String,
        required: [true, "Please enter the price"]
    },
    rating: {
        type: String,
        required: [true, "Please enter the rating"]
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
        type: String,
        required: [true, "Please enter the stock"]
    },
    numberOfReviews: {
        type: String,
        required: [true, "Please enter the number of reviews"]
    }
});

module.exports = mongoose.model("Product", ProductSchema);
