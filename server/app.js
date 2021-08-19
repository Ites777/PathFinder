 const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser')

// const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/userRouter');
const routesRouter = require('./routes/routesRouter');
const uploadRouter = require('./routes/uploadRouter');

const app = express();
const redis = require("redis");
const session = require("express-session");
const { userInfo } = require('os');
let RedisStore = require("connect-redis")(session);
let redisClient = redis.createClient();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(cors({
  origin: true,
  credentials: true
}))
app.use(bodyParser.json({limit: '50mb'}));
app.use(logger('dev'));
app.use(express.json({limit: '5mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    name: "sId",
    store: new RedisStore({ client: redisClient }),
    saveUninitialized: false,
    secret: "Chubaka",
    resave: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1e3 * 86400,
    }
  }),
  
);

// app.use('/', indexRouter);
app.use('/', routesRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter)
app.use('/upload', uploadRouter);
// app.use('/users', userRouter);

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

module.exports = app;
