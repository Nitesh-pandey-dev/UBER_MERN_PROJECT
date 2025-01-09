const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    firstname:{
      type: String,
      required: true,
      minlength: [3, "First name must contain atleast 3 characters"],
    },
    lastname:{
      type: String,
      minlength: [3, "Last name must contain atleast 3 characters"],
    },
    phone:{
      type:Number,
      required:true
    },
    email:{
      type: String,
      unique: true,
      required: true,
    },
    password:{
      type: String,
      required: true,
      select: false,
    },
    socketid:{
      type: String,
    },
  },{timestamps:true});
module.exports = mongoose.model('User',userSchema);
