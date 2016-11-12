         var express = require('express');
         var session = require('express-session');
          var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var path = require('path');

var cookieParser = require('cookie-parser');
  var bodyParser = require('body-parser');

var flash = require('connect-flash');

// User Passportjs.org for authentication
     var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// Use MongoDB to store users and credentials
   var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/login');
      var db = mongoose.connection;

var routes = require('./routes/index');
 var users = require('./routes/users');

// App init
var app = express();

// Views
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Path Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
// from https://github.com/ctavan/express-validator#errorformatter
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect-flash for Express
app.use(flash());

// Global vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});


app.use('/', routes);
app.use('/users', users);

// Set server port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
});















