const mongoose = require("mongoose")
mongoose.set("debug",true)
const URI=`mongodb+srv://sarthak:sarthak1@cluster0.nhwev.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
mongoose.connect(URI,{useNewUrlParser:true,useUnifiedTopology:true},err=>{
    if(err){
        console.log(err)
    }else{
        console.log(`Connected To Database`)
    }
    
})

mongoose.Promise = Promise;
module.exports.Post = require("./post")
module.exports.User = require("./user")