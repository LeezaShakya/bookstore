import mongoose from "mongoose";
import { Schema } from "mongoose";
import slug from 'mongoose-slug-generator';
mongoose.plugin(slug);
const booksSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique:true
    },
    description: {
        type: String,
        required: true,
        unique:true
    },
    author:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: true,
        default: []
    }],
    image: {
        type: String,
        default: null
    },
    price: {
        type: Number,
        required: true
    },
    genre: [{
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'Genre',
        required: true,
        default: []
    }],
    sold:{
        type: Number,
        required: true,
        default: 0
    },
    stock:{
        type: Number,
        required: true,
        default: 0
    },
    slug:{
        type: String,
        unique:true,
        slug:"name",
    },
    bestseller:{
        type: Boolean,
        required: true,
        default: false,
    }
},
{
    timestamps: true
});

const Books = mongoose.model('Book', booksSchema);
export default Books