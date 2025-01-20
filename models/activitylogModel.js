import mongoose from "mongoose";
import { Schema } from "mongoose";

const activitySchema = new Schema({
    action: {
        type: String,
        enum: ['Added','Updated','Deleted','Ordered'],
        required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    bookId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Books',
        default: null
    },
    orderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        default: null
    },
    timestamp: {
        type: Date,
        default:Date.now
    }
})
const Activity = mongoose.model('Activity', activitySchema)

export default Activity;