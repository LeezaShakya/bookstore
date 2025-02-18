import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";
import Books from "../models/booksModel.js";
import activityTracker from "../config/activity.js";
// accessible to all authenticated users
export const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const userCart = await Cart.findOne({ userId: userId });
    const totalPrice = userCart.totalPrice;
    const totalProduct = userCart.totalProducts;
    console.log("hello")
    let newOrder = new Order({
      orderby: req.user.id,
      books: userCart.books,
      amount: totalPrice,
      count: totalProduct,
      shippingAddress: req.body.shippingAddress,
      city: req.body.city,
      zip: req.body.zip,
      phone: req.body.phone,
      status: "Pending",
    });
    let order = await newOrder.save();
    order = await Order.findById(order._id)
      .populate({ path: "orderby", select: "username" })
      .populate("books.book");
    // Step 1: Update sales and stock using `bulkWrite`
    const updateStockAndSales = userCart.books.map((item) => ({
      updateOne: {
        filter: { _id: item.book._id },
        update: {
          $inc: {
            stock: -item.quantity, // Decrement stock
            sales: item.quantity   // Increment sales
          }
        }
      }
    }));

    await Books.bulkWrite(updateStockAndSales);

    const updateBestseller = userCart.books.map((item) => ({
      updateOne: {
        filter: { _id: item.book._id },
        update: {
          $set: {
            bestseller: {
              $cond: [{ $gte: ["$sales", "$stock"] }, true, false]
            }
          }
        }
      }
    }));

    // Perform the bestseller update
    await Books.bulkWrite(updateBestseller);
    const orderId= order._id.toHexString();
    await activityTracker('Added', req.user.id, 'order', orderId);
    res.status(201).json({
      msg: "Order has been created",
      orders: order,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error",
      error: error.message,
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
      orders: order,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error",
      error: error,
    });
  }
};

//all orders of a user
export const getOrdersByUserId = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ orderby: userId }).populate("books.book");
    if (orders.length === 0) {
      return res.status(404).json({ msg: "No orders found for this user" });
    }
    res.status(200).json({
      msg: "Orders retrieved successfully",
      orders: orders,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error",
      error: error.message,
    });
  }
};

// admin only
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({
      msg: "Orders retrieved successfully",
      orders: orders,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error",
      error: error,
    });
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
    if (status != "Success") {
      const updateBooks = userCart.books.map((item) => ({
        updateOne: {
          filter: { _id: item.book._id },
          update: {
            $dec: {
              stock: -item.quantity,
              sales: item.quantity
            },
            $set: {
              bestseller: {
                $cond: {
                  if: { $gt: [{ $add: ["$sales", item.quantity] }, { $subtract: ["$stock", item.quantity] }] },
                  then: true,
                  else: false
                }
              }
            }
          }
        }
      }));
      await Books.bulkWrite(updateBooks)
    }
    await updatedOrder.save();
    const orderId= updatedOrder._id.toHexString();
    await activityTracker('Updated', req.user._id, 'order', orderId);
    res.status(200).json({
      msg: "Order updated successfully",
      orders: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error",
      error: error,
    });
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
