import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const orderSchema = new Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true },
    books: [{
        book: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Book', 
            required: true },
        quantity: { 
            type: Number, 
            required: true, 
            min: 1 }
    }],
    address: {
        type: String,
        
    },
    totalAmount: { 
        type: Number, 
        required: true },
    status: { 
        type: String, 
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'], 
        default: 'pending' },
},
{ 
    timestamps: true 
  });
const Order = mongoose.model('Order', orderSchema);

export default Order;