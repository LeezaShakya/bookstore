import mongoose from "mongoose";
import slug from 'mongoose-slug-generator';
import { Schema } from "mongoose";

const genreSchema = new Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    slug: {
        type: String,
        unique:true,
        slug:"name",
    }
})

const Genre = mongoose.model('Genre', genreSchema)
export default Genre