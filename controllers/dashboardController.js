import Order from "../models/orderModel.js"
export const TotalCount = async (req, res) => {
    try{
        const totalOrders = await Order.count()
        console.log(totalOrders,"oooo")
        res.status(201).json({
            msg: "Order has been created"
          });
    }
    catch(error){
        res.status(500).json({
            msg: "Internal server error",
            error: error.message,
          });
    }
}