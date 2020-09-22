var createError = require('http-errors'),
    express = require('express'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan'),
    engines = require('consolidate'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    LocalStrategy =require('passport-local'),
    passport = require('passport');
    Comment = require('./models/comment'),
    Post = require('./models/post'),
    User = require('./models/user'),
    fs = require('fs-extra'),
    multer = require('multer'),
    Handlebars = require('handlebars'), 
    expressHbs = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts');
var commentsRouter = require('./routes/comments');

var app = express();
mongoose.connect("mongodb://localhost/poster",{ useUnifiedTopology: true, useNewUrlParser: true }); 
// let url = process.env.DATABASEURL;
// mongoose.connect(url,{ useUnifiedTopology: true, useNewUrlParser: true });
// app.engine('ejs', engines.ejs);  //l1
// app.engine('hbs', engines.hbs);
// app.engine('html', engines.swig);
app.engine("hbs", expressHbs({ extname: ".hbs",defaultLayout:false, viewsDir:__dirname + "/views", handlebars: allowInsecurePrototypeAccess(Handlebars) }));
app.set("view engine", "hbs");

var hbs = expressHbs.create({});
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

// var storage = multer.diskStorage({ 
//     destination: (req, file, cb) => { 
//         cb(null, 'uploads') 
//     }, 
//     filename: (req, file, cb) => { 
//         cb(null, file.fieldname + '-' + Date.now()) 
//     } 
// });
// var upload = multer({ storage: storage });
expressHbs.registerHelper('isEmpty', function(str,options) {
    return (!str || 0 === str.length);
});

app.use(require("express-session")({
    secret: "bazooka",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});

app.use('/', indexRouter);
app.use('/posts', postsRouter);
app.use('/users', usersRouter);
app.use('/posts/:id/comments', commentsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), process.env.IP, () => console.log("eai-c2 Server Has Started!"));

module.exports = app;