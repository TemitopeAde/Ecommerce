import mongoose from "mongoose";

const products = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
    trim: true
  },

  description: {
    type: String,
    required: [true, "Please enter product description"]
  },

  price: {
    type: Number,
    required: [true, "Please enter product price"]
  },

  images: [
    {
      url: {
        type: String,
        required: true
      }
    }
  ],

  brand: {
    name: {
      type: String,
      required: false
    }
  },

  logo: {
    url: {
      type: String,
      required: false
    }
  },

  category: {
    type: String,
    required: false,
  },

  ratings: {
    type: Number,
    default: 0
  },

  createdAt: {
    type: Date,
    default: Date.now
  },


})


export default mongoose.model("Products", products)