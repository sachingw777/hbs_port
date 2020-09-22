var express = require('express'),
    // path = require('path'),
    // fs = require('fs-extra'),
    router = express.Router(),
    Post = require('../models/post');
//    middleware = require('../middleware');

router.get('/', (req, res, next) => {
    Post.find().exec((err, posts) => {
        res.render('index.hbs', { posts: posts });
    });
});

//Like button logic.
router.post('/:id/act', (req, res, next) => {
    const action = req.body.action;
    const counter = action === 'Like' ? + 1 : 1;
    Post.updateOne({_id: req.params.id}, {$inc: {likes_count: counter}}, {}, (err, numberAffected) => {
        res.send('');
    });
});

router.post('/', function(req, res){
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var text = req.body.postText;
    var image = req.body.image;
    // var imagePath = req.body.imagePath;
    // var image = {
    //     data: fs.readFileSync(imagePath),
    //     contentType: 'image/png'
    // };
    //Image2
    // var image = { 
    //         data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.body.image)), 
    //         contentType: 'image/png'
    // };
    var newPost = {text:text, author:author, posted_at:Date.now(), likes_count:0,image:image};
    Post.create(newPost, function(err,newlyCreated){       
        if(err){
            console.log(err);
//            res.render("GOTTA LOGIN");
        }else{
            console.log(newlyCreated);
            res.redirect('/posts');
        }
    });
});

//NEW PAGE
router.get('/new', (req, res, next) => {
        res.render('new.hbs');
});

//SHOW PAGE
router.get("/:id", function(req, res){
    Post.findById(req.params.id).populate("comments").exec(function(err, foundPost){
       if (err) {
           console.log(err);
       } else {
           res.render("show.hbs", {post: foundPost});
       }
    });
});

module.exports = router;