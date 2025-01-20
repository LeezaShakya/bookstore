import mongoose from "mongoose";
import { Schema } from "mongoose";

const dashboardSchema = new Schema({
    totalOrders: {
        type: Number,
        required: true
    },
    pendingOrders: {
        type: Number,
        required: true
    },
    totalSales: {
        type: Number,
        required: true
    },
    totalProducts: {
        type: Number,
        required: true
    },
    activity:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Activity'
    }
})
const Dashboard = mongoose.model('Dashboard', dashboardSchema);
export default Dashboard