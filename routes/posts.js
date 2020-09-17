var express = require('express'),
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

    var newPost = {text:text, author:author, posted_at:Date.now(), likes_count:0};
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