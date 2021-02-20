var express = require('express');
var router = express.Router();
const db = require("../models")
/* GET home page. */
router.get('/', function(req, res, next) {
    
      res.render("category/index")
  
});

router.get('/:category', function(req, res, next) {
    console.log(req.params.category)
    db.Post.find({}).where("category").equals(req.params.category).then((resp)=>{
        if(resp.length>0){
           res.render("post/index",{posts:resp})

        }else{
            res.render("error",{message:`No Post Found In this Category`,error:{staus:404,stack:""}})
        }
     
    })
});

module.exports = router;
