import mongoose from "mongoose";
// import val

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"]
  },

  email: {
    type: String,
    required: [true, "Please enter your email"]
  },

  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should have atleast 8 chars"],
    select: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  gender: {
    type: String,
    required: [true, "Please Enter Gender"]
  },

  role: {
    type: String,
    default: "user",
  },

  avatar: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    }
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
})


module.exports = mongoose.model("User", userSchema)