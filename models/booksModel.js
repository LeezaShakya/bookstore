import mongoose from "mongoose";
import { Schema } from "mongoose";
import slugify from 'slugify';
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

booksSchema.pre('save', function (next) {
    if (this.isModified('name') || this.isNew) {
      this.slug = slugify(this.name, {
        lower: true,  
        strict: true  
      });
    }
    next();
  });
const Books = mongoose.model('Book', booksSchema);
export default Books