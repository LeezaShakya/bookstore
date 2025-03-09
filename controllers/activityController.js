import Activity from "../models/activitylogModel.js";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
export const GetAllActivity = async (req, res) => {
    try {
      let activity = await Activity.find().populate('userId','username').lean(); 
      activity = activity.map(item => {
        const{userId, ...rest} = item
        return ({
        ...rest,
        username: item.userId?.username, 
      })});
      if (activity.length === 0) {
        return res.status(400).json({ error: "No Activity Recorded" });
      }
      res.status(200).json({ data: activity });
    } catch (err) {
      res.status(500).json({
        msg: "Something went wrong",
        error: err.message,
      });
    }
  };
export const GetTotal = async (req, res) => {
    try {
      let users = await User.countDocuments() || [];
      let orders= await Order.countDocuments() || [];
      let sales = await Order.aggregate([
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]);
      sales = sales[0].total
      res.status(200).json({ users, orders, sales });
    } catch (err) {
      res.status(500).json({
        msg: "Something went wrong",
        error: err.message,
      });
    }
  };