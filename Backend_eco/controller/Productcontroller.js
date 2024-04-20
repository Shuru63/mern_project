const product = require("../modal/productmodal");

const getAllRouter = async (req, res) => {
    // const products = await product.find();
    res.status(200).json({ message: "Route is working", success: true });
};

module.exports = getAllRouter;