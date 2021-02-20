var express = require('express');
var router = express.Router();
const db = require("../models")
const User = require("../models/user")
/* GET home page. */
router.get('/', function(req, res, next) {
    db.Post.find({}).then((resp)=>{
      res.render("post/index",{posts:resp})
    })
});

router.get('/login', function(req, res, next) {
  
    res.render("login")
  
});

router.get('/register', function(req, res, next) {
  
  res.render("register")

});

router.get("/users",(req,res)=>{
  db.User.find({}).then((resp)=>{
    res.send(resp)
  })
})

router.post('/register', function(req, res, next) {
  const {name,email,password}=req.body
  let errors=[]
  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }
  if(errors.length>0){
    res.render('register', {
      errors,
      name,
      email,
      password,
     
    });
  }else{
    db.User.find({email:email}).then((user)=>{
      console.log(`Email already exists`)
      if(user){
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,        
          password,
        
        })
      }else{
        const newUser = new User({
          name,
          email,
          password,
         
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
               console.log(`New User Created`)
                res.redirect('/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    })
  }
 
});

module.exports = router;
