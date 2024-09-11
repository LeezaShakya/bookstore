import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import slugify from 'slugify';

const authorSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter the author name"],
  },
  slug: {
    type: String, 
    unique: true
  }
}, { 
  timestamps: true 
});

authorSchema.pre('save', function (next) {
  if (this.isModified('name') || this.isNew) {
    this.slug = slugify(this.name, {
      lower: true,  
      strict: true  
    });
  }
  next();
});

const Author = mongoose.model('Author', authorSchema);

export default Author;
