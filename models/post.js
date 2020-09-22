let mongoose = require('mongoose');

let postSchema = new mongoose.Schema({
    text: String,
    posted_at: Date,
    // image: {
    //     data: Buffer, 
    //     contentType: String
    // },
    image: String,
    likes_count: Number,
    author: {
          id: {
             type: mongoose.Schema.Types.ObjectId,
             ref: "User"
          },
          username: String
       },
       comments: [
          {
             type: mongoose.Schema.Types.ObjectId,
             ref: "Comment"
          },
       ]
});

module.exports = mongoose.model("Post", postSchema);