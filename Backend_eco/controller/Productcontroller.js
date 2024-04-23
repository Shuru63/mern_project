const Product = require("../modal/productmodal");
const Apifeatures = require("../utils/Apifeture");
const ErrorHandle = require("../utils/ErrorHandler");

// create the product
const createProduct = async (req, res, next) => {
    try {
        const createProducts = await Product.create(req.body);
        res.status(200).json({ 
            success: true,
             product: createProducts });
    } catch (error) {
        return next(new ErrorHandle("please enter proper details", 400));
    }
};
// get all product in database
const getAllRouter = async (req, res, next) => {
    try {
        const resultPerPage = 10;
        const productcount = await Product.countDocuments();
        const apifeature = new Apifeatures(Product.find(), req.query)
            .search()
            .filter()
            .pagination(resultPerPage);
        const products = await apifeature.query;
        res.status(200).json({
            success: true,
            products,
            productcount
        });
    } catch (error) {
        return next(new ErrorHandle("Unable to retrieve products", 500));
    }

};
// update the product
const updateproduct = async (req, res, next) => {
    try {
        let productupdate = Product.findById(req.params.id);
        if (!productupdate) {
            return next(new ErrorHandle("product is not found", 500))
        }
        productupdate = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });
        res.status(200).json({ success: true, productupdate })
    }
    catch (error) {
        return next(new ErrorHandle("please enter proper details", 400));
    }
}
// delete product
const deleteProduct = async (req, res, next) => {
    try {
        const productDelete = await Product.findById(req.params.id);
        if (!productDelete) {
            return next(new ErrorHandle("product is not found", 500))
        }
        await Product.deleteOne({ _id: req.params.id });
        res.status(200).json({
            success: true,
            message: "Product is deleted successfully"
        });
    } catch (error) {
        return next(new ErrorHandle("please enter proper details", 400));
    }

}
const getProductDetails = async (req, res) => {
    try {
        const singleproduct = await Product.findById(req.params.id);
        if (!singleproduct) {
            return next(new ErrorHandle("product is not found", 500))

        }
        res.status(200).json({
            success: true,
            singleproduct
        })
    } catch (error) {
        return next(new ErrorHandle("please enter proper details", 400));
    }

}
module.exports = {
    getAllRouter,
    createProduct,
    updateproduct,
    deleteProduct,
    getProductDetails
};