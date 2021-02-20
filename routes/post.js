var express = require('express');
var router = express.Router();
var slugify = require('slugify')

const db = require("../models")
/* GET home page. */
router.get('/', function(req, res, next) {
    db.Post.find({}).then((resp)=>{
        res.send(resp)
        //     res.render('post/index', {posts:resp});

    })
});


router.get('/create-new-post', function(req, res, next) {
    res.render("post/add")
});


router.post('/create-new-post', function(req, res, next) {
    
    const body = {...req.body,category:[req.body.category],slug:slugify(req.body.title,{lower:true})}
    db.Post.create(body).then((r)=>{
   console.log(body) 

        res.redirect("/")
    })
});

router.get('/edit/:id', function(req, res, next) {
    // const body = {...req.body,category:[req.body.category],slug:slugify(req.body.title,{lower:true})}
   
   db.Post.findById(req.params.id).then((resp)=>{
       res.render("post/edit",{posts:resp})
   }).catch(er=>{
       res.render("error")
   })
});

router.post('/edit/:id', function(req, res, next) {
    const body = {...req.body,category:[req.body.category],slug:slugify(req.body.title,{lower:true})}
   
   db.Post.findByIdAndUpdate(req.params.id,body).then((resp)=>{
    //    res.render("post/edit",{posts:resp})
    res.redirect("/post/"+body.slug)
   }).catch(er=>{
       res.render("error")
   })
});

router.get('/delete/:id', function(req, res, next) {
    
   db.Post.findByIdAndDelete(req.params.id).then((resp)=>{
       res.redirect("/")
   })
});

router.get('/:slug', function(req, res, next) {
    db.Post.find({slug:req.params.slug}).then((resp)=>{
        // res.send(resp)
        res.render("post/single",{post:resp[0]})
    }).catch(er=>{
        res.render("error")
    })
 });
 

module.exports = router;
