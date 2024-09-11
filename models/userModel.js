import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: null,
    },
    role: {
        type: String,
        required: true,
        default: "Common"
    },
},
{
    toJSON: {
        transform: function (doc, ret) {
        //`ret` - internally transformed POJO and doc is original document
          delete ret.password;
          return ret;
        },
      },
})

const User = mongoose.model('User', userSchema)
export default User;