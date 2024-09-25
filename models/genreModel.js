import mongoose from "mongoose";
import slugify from 'slugify';
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
    }
})
genreSchema.pre('save', function (next) {
    if (this.isModified('name') || this.isNew) {
      this.slug = slugify(this.name, {
        lower: true,  
        strict: true  
      });
    }
    next();
  });

const Genre = mongoose.model('Genre', genreSchema)
export default Genre