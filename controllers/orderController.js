
import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";
import Books from "../models/booksModel.js";
// accessible to all authenticated users
export const createOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const userCart = await Cart.findOne({userId: userId})
        const totalPrice= userCart.totalPrice
        const totalProduct = userCart.totalProducts
        let newOrder = new Order({
            orderby: req.user.id,
            books: userCart.books,
            amount: totalPrice,
            count: totalProduct,
            shippingAddress: req.body.shippingAddress,
            city: req.body.city,
            zip: req.body.zip,
            phone: req.body.phone,
            status: 'Pending',
        });
        let order = await newOrder.save();
        order = await Order.findById(order._id).populate({ path: 'orderby', select: 'username' }).populate('books.book')
        let updateBook = userCart.books.map((item)=>{
            return {
                updateOne: {
                    filter:{_id: item.book._id},
                    update: {
                        $inc : {
                            stock: -item.quantity
                        }
                    }
                }
            }
        })
        await Books.bulkWrite(updateBook, {})
        res.status(201).json({
            msg: "Order has been created",
            orders: order
        });
    } catch (error) {
        res.status(500).json({
            msg: "Internal server error",
            error: error.message
        });
    }
};


export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ msg: "Order not found" });
        }
        res.status(200).json({
            msg: "Order retrieved successfully",
            orders: order
        });
    } catch (error) {
        res.status(500).json({ 
            msg: "Internal server error", 
            error: error });
    }
};

//all orders of a user
export const getOrdersByUserId = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await Order.find({ orderby: userId}).populate('books.book');
        if (orders.length === 0) {
            return res.status(404).json({ msg: "No orders found for this user" });
        }
        res.status(200).json({
            msg: "Orders retrieved successfully",
            orders: orders
        });
    } catch (error) {
        res.status(500).json({ 
            msg: "Internal server error", 
            error: error.message 
        });
    }
};

// admin only
export const getAllOrders = async (req, res) => {
    if (req.user.role !== 'Admin') {
        return res.status(403).json({ msg: "Access is Denied" });
    }
    try {
        const orders = await Order.find();
        res.status(200).json({
            msg: "Orders retrieved successfully",
            orders: orders
        });
    } catch (error) {
        res.status(500).json({
            msg: "Internal server error", 
            error: error });
    }
};


export const updateOrderById = async (req, res) => {
    try {
        const { status } = req.body;
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ msg: "Order not found" });
        }
        if(status === 'Success'){
            let updateBook = updatedOrder.books.map((item)=>{
                return {
                    updateOne: {
                        filter:{_id: item.book._id},
                        update: {
                            $inc : {
                                sold: +item.quantity
                            }
                        }
                    }
                }
            })
            await Books.bulkWrite(updateBook, {})
            await Cart.findOneAndDelete({ userId: updatedOrder.orderby });
        }
        await updatedOrder.save();

        res.status(200).json({
            msg: "Order updated successfully",
            orders: updatedOrder
        });
    } catch (error) {
        res.status(500).json({ 
            msg: "Internal server error", 
            error: error });
    }
};


// export const deleteOrderById = async (req, res) => {
//     if (req.user.role !== 'Admin') {
//         return res.status(403).json({ msg: "Access forbidden: Admins only" });
//     }
//     try {
//         const deletedOrder = await Order.findByIdAndDelete(req.params.id);
//         if (!deletedOrder) {
//             return res.status(404).json({ msg: "Order not found" });
//         }
//         res.status(200).json({
//             msg: "Order deleted successfully"
//         });
//     } catch (error) {
//         res.status(500).json({ 
//             msg: "Internal server error", 
//             error: error });
//     }
// };
