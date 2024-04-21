const Product = require("../modal/productmodal");
// create the product
const createProduct = async (req, res) => {
    const createProducts = await Product.create(req.body)
    res.status(200).json({ success: true, product: createProducts });
}
// get all product in database
const getAllRouter = async (req, res) => {
    const products = await Product.find();
    res.status(200).json({ success: true, products });
};
// update the product
const updateproduct = async (req, res) => {
    let productupdate = Product.findById(req.params.id);
    if (!productupdate) {
        return res.status(500).json({
            success: flase
            , message: "product is not find"
        });
    }
    productupdate = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({ success: true, productupdate })
}
// delete product
const deleteProduct = async (req, res) => {
    const productDelete = await Product.findById(req.params.id);
    if (!productDelete) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }
    await Product.deleteOne({ _id: req.params.id });
    res.status(200).json({
        success: true,
        message: "Product is deleted successfully"
    });
}
const getProductDetails= async (req,res) =>{
 const singleproduct=await Product.findById(req.params.id);
 if(!singleproduct){
    return res.status(404).json({
        success:false,
        message:"product is not found "
    })

 }  
   res.status(200).json({
        success:true,
        singleproduct
    })
}
module.exports = { getAllRouter,
     createProduct, 
     updateproduct,
      deleteProduct,
     getProductDetails };