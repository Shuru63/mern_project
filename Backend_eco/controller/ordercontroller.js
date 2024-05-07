const Order = require("../modal/Ordermodal");
const ErrorHandle = require("../utils/ErrorHandler");
const Product = require("../modal/productmodal");
const newOrder = async (req, res, next) => {
    try {
        const {
            shippingInfo,
            orderItems,
            paymentInfo,
        } = req.body;
        const orderByUser = await Order.create({
            shippingInfo,
            orderItems,
            paymentInfo: {
                ...paymentInfo,
                paidAt: Date.now(),
            },
            user: req.user._id,
        });
        res.status(200).json({
            success: true,
            orderByUser,
        });
    } catch (error) {
        return next(new ErrorHandle("new order api is not working", 400));
    }
};
// logged in all order fetched
// getSingleOrder
const getSingleOrder = async (req, res, next) => {
    try {
        const singleOrder = await Order.findById(req.params.id).populate(
            "user",
            "name email"
        );
        console.log(singleOrder);
        if (!singleOrder) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        res.status(200).json({
            success: true,
            singleOrder,
        });
    } catch (error) {
        return next(new Error("Failed to fetch single order"),400);
    }
}
// get all order -- admin
const getAllOrder = async (req, res, next) => {
    try {
        const AllOrder = await Order.find()
        if (!AllOrder) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        let countorder=0;
        AllOrder.forEach((order)=>{
            countorder=countorder+order.totalPrice
        })
        res.status(200).json({
            success: true,
            AllOrder,
            countorder
        });
    } catch (error) {
        return next(new Error("Failed to fetch single order"),400);
    }
}
// update order status ---admin
const updateOrder = async (req, res, next) => {
     try {
        const statusOrder = await Order.findById(req.params.id);

        if (!statusOrder) {
            return next(new ErrorHandle("product is not found", 500))
        }

        if (statusOrder.paymentInfo.orderStatus==="Delivered") {
            return next(new ErrorHandle("you have already delivered this product"),400)
        }

        // statusOrder.orderItems.forEach(async(order)=>{
        //      await updateStock(order.id,order.quantity)
        // });
         
        statusOrder.paymentInfo.orderStatus=req.body.orderStatus;{
            if (!statusOrder.paymentInfo.orderStatus) {
                return next(new ErrorHandle("enter status order first"),400)
            }
        }
        if (req.body.status==="Delivered") {
            statusOrder.deliveredAt=Date.now();
        }
        await statusOrder.save({validateBeforeSave:false});
        res.status(200).json({
            success: true,
        });
    } catch (error) {
        return next(new Error("Failed to fetch single order"),400);
    }

};

// async function updateStock(id, quantity) {
//     const product = await Product.findById(id);
//     product.stocks -= quantity;
//     await product.save({ validateBeforeSave: false });
// }

// delete order status ---admin
const deleteOrder = async (req, res, next) => {
    try {
        const orderDelete = await Order.findById(req.params.id)
        if (!orderDelete) {
            return next(new ErrorHandle("product is not found", 500))
        }
        await Order.deleteOne({ _id: req.params.id });
        res.status(200).json({
            success: true,
        });
    } catch (error) {
        return next(new Error("Failed to fetch single order"),400);
    }
};




const myOrder = async (req, res, next) => {
    try {
        const singleOrder = await Order.find({user:req.user._id});
        if (!singleOrder) {
            return next(new ErrorHandle("order is not found"), 400);
        }
        res.status(200).json({
            success: true,
            singleOrder,
        });
    } catch (error) {
        return next(new ErrorHandle("single Order api is not working"), 400);
    }
}
module.exports = {
    newOrder,
    getSingleOrder,
    myOrder,
    getAllOrder,
    updateOrder,
    deleteOrder
};
