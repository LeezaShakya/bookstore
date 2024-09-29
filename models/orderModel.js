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
    paymentIntent: {
        amount: { 
            type: Number, 
            required: true 
        },
        currency: { 
            type: String, 
            required: true,
            default: 'usd'
        },
        paymentStatus: { 
            type: String, 
            enum: ['succeeded', 'pending', 'failed'], 
            default: 'pending' 
        },
        created: { 
            type: Date 
        }
    },
    orderStatus: { 
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