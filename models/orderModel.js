import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const orderSchema = new Schema({
    orderby: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true ,
    },
    books: [{
        book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book'
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
            default: 1
        }
    }],
    amount: { 
        type: Number, 
        required: true 
    },
    count: { 
        type: Number, 
        required: true 
    },
    shippingAddress: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    zip: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    status: { 
        type: String, 
        enum: ['Pending', 'Processing', 'Shipped' ,'Delivered', 'Cancelled'], 
        default: 'Pending' 
    },
},
{ 
    timestamps: true 
  });
const Order = mongoose.model('Order', orderSchema);

export default Order;