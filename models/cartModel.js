import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
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
    totalPrice: {
        type: Number,
        required: true,
    },
    totalProducts: {
        type: Number,
        required: true,
    },
    totalQuantity: {
        type: Number,
        required: true,
    }

})

const Cart= mongoose.model('Cart', cartSchema)
export default Cart