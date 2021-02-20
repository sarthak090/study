const mongoose = require("mongoose")
const postSchema= new mongoose.Schema({
    title:{
        type:String,
        requireed:true
    },slug:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },category :[String], 
    date: {
        type: Date,
        default: Date.now
      },author: {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },
        name: String
      }


})
module.exports = mongoose.model("Post",postSchema)