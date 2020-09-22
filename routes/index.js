var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Post = require('../models/post')

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;

var Post = require('./../models/post');

//router.get('/', (req, res, next) => {
//    Post.find().exec((err, posts) => {
//        res.render('index.hbs', { posts: posts });
//    });
//});

router.get('/',function(req,res){
    res.render('landing')
})

router.get('/login',function(req,res){
    res.render('login')
});

router.post("/login", passport.authenticate("local", 
    {    //passport authenticate middleware
        successRedirect: "/posts",
        failureRedirect: "/login"
    }), function(req, res){ //not required
});

router.get('/register',function(req,res){
    res.render('register.hbs')
});

router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if (err){
                console.log(err);
                return res.render("register");
            }
        passport.authenticate("local")(req, res, function(){
                res.redirect("login");
        });
    });
});

router.get("/logout", function(req, res){
    req.logout(); // part of the packages
    res.redirect("/");
});


module.exports = router;