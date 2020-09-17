var express = require("express");
var router = express.Router({mergeParams: true});   
//a new instance of express router and adding routes to this router - MERGES PARAMS FROM POSTS AND COMMENTS TOGETHER SO THAT INSIDE THE COMMENT ROUTES, WE'RE ABLE TO ACCESS THE :id WE DEFINED
var Post = require("../models/post");
var Comment = require("../models/comment");
//var middleware = require("../middleware");


//router.get("/", function(req, res){
//    //find site by id
//    Post.findById(req.params.id, function(err, post){
//       if(err){
//            console.log(err);
//       } else {
//            res.render("/", {post: post});
//       } 
//    });
//});

//router.post('/', function(req, res){
//    var author = {
//        id: req.user._id,
//        username: req.user.username
//    };
//    var text = req.body.postText;
//
//    var newPost = {text:text, author:author, posted_at:Date.now(), likes_count:0};
//    Post.create(newPost, function(err,newlyCreated){       
//        if(err){
//            console.log(err);
////            res.render("GOTTA LOGIN");
//        }else{
//            console.log(newlyCreated);
//            res.redirect('/posts');
//        }
//    });
//});


router.post("/", function(req, res){
   // look up site using ID
    Post.findById(req.params.id, function(err, post){
        if(err){
            console.log(err);
            res.redirect("#");
        } else {
            var author = {
                id: req.user._id,
                username: req.user.username
            };
           var text = req.body.commentText;
            var newComment = {text: text, author:author}
            
            Comment.create(newComment, function(err, newlyCreated){
                if(err){
                    console.log(err);          
                    } else {
                        //add username and ID to comment
//                        comment.author.id = req.user._id;
//                        comment.author.username = req.user.username;
                        //save comment
//                        comment.save();
                        post.comments.push(newlyCreated);
                        post.save();
                        res.redirect("/posts/" + post._id);
        //            res.redirect("#");

                }
            });
        }
    });
});

module.exports = router;