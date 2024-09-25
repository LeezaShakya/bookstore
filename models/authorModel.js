import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const authorSchema = new Schema({
    name: {
      type: String,
      required: [true, "Please enter the author name"],
    },
    biography: {
      type: String,
      required: false,
    },
    books: [{
      type: Schema.Types.ObjectId,
      ref: 'Books',
    }],
  }, {
    timestamps: true,
  });

const Author = mongoose.model('Author', authorSchema);

export default Author;
