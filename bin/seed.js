 // #!/usr/bin/env node

let faker = require('faker');
let Post = require('../models/post');
let mongoose =require('mongoose');
faker.locale = "en";

// connect to MongoDB
// .connect('mongodb://localhost/poster');
mongoose.connect(process.env.DATABASEURL,{ useUnifiedTopology: true, useNewUrlParser: true });

// remove all data from the collection first
Post.deleteMany({})
    .then(() => {
        let posts = [];
        for (let i = 0; i < 10; i++) {
            posts.push({
                text: faker.lorem.sentence(),
                posted_at: faker.date.past(),
                likes_count: Math.round(Math.random() * 20),
                author: {
                    username:faker.name.firstName()
                },
            });
        }
        return Post.create(posts);
    })
    .then(() => {
        process.exit();
    })
    .catch((e) => {
        console.log(e);
        process.exit(1);
    });