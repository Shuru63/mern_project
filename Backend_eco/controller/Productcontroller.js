const Product = require("../modal/productmodal");
const Apifeatures = require("../utils/Apifeture");
const ErrorHandle = require("../utils/ErrorHandler");

// create the product
const createProduct = async (req, res, next) => {
     try {
        const createProducts = await Product.create(req.body);
        res.status(200).json({
            success: true,
            product: createProducts
        });
    } catch (error) {
        return next(new ErrorHandle("please enter all  details of product", 400));
    }
};
// get all product in database
const getAllRouter = async (req, res, next) => {
       
    try {
        // const resultPerPage = 8;
        const productcount = await Product.countDocuments();
        const apifeature = new Apifeatures(Product.find(), req.query)
            .search()
            .filter()
            // .pagination(resultPerPage);
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
const getAllAdminRouter = async (req, res, next) => {
       
    try {
        const productcount = await Product.countDocuments();
        const apifeature = new Apifeatures(Product.find(), req.query)
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
const getProductDetails = async (req, res,next) => {
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
// user reviews
const userReview = async (req, res, next) => {
    try {
        const { rating, comment, productId } = req.body;
        const product = await Product.findById(productId)

        const Reviews = product.Reviews.findIndex(rev => rev.user.toString() === req.user._id.toString());

        console.log(Reviews)
        if (Reviews !== -1) {
            product.Reviews[Reviews].rating = Number(rating);
            product.Reviews[Reviews].comment = comment;
        } else {
            product.Reviews.push({
                user: req.user.id,
                name: req.user.name,
                rating: Number(rating),
                comment
            });
        }

        let totalRating = 0;
        product.Reviews.forEach(rev => {
            totalRating += rev.rating;
        });
        product.Rating = product.Reviews.length > 0 ? totalRating / product.Reviews.length : 0;
        product.numOfReviews = product.Reviews.length;

        await product.save();

        res.status(200).json({
            success: true,
        });
    } catch (error) {
        return next(new ErrorHandle("the review api is not working"), 400)
    }
}
const getallreview = async (req, res, next) => {
    try {
        const product = await Product.findById(req.query.id);
        console.log(product)
        if (!product) {
            return next(new ErrorHandle("the product is not  found", 400))
        }
       
        res.status(200).json({
            success: true,
            Reviews: product.Reviews,
        })
    } catch (error) {
        return next(new ErrorHandle("getallreview is not working", 400))
    }
}
// delete reviews
const deleteReview = async (req, res, next) => {
    // try {
        const product = await Product.findById(req.query.productId);
       
        if (!product) {
            return next(new ErrorHandle("the product is not  found", 400))
        }
        const Reviews = product.Reviews.filter(rev => rev.user.toString() === req.user._id.toString());
        let totalRating = 0;
        Reviews.forEach(rev => {
            totalRating += rev.rating;
        });
       const Rating = Reviews.length > 0 ? totalRating / Reviews.length : 0;
       const numOfReviews = Reviews.length;
       await Product.findByIdAndUpdate(
        req.query.productId,{
            Reviews,
            Rating,
            numOfReviews
        },{
            new: true,
            runValidators: true,
            useFindAndModify: false
        }
       )
        res.status(200).json({
            success: true,
        })
    // }
    // // catch (error) {
    // //     return next(new ErrorHandle("deleteReview is not  working", 400))
    // // }
}


module.exports = {
    getAllRouter,
    createProduct,
    updateproduct,
    deleteProduct,
    getProductDetails,
    userReview,
    getallreview,
    deleteReview,
    getAllAdminRouter
};