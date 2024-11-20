const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');

const AppError = require('./utilities/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/toursRoutes');
const userRouter = require('./routes/userRoutes');
const reviewsRouter = require('./routes/reviewsRoutes');
const viewsRouter = require('./routes/viewsRoutes');

const app = express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// 1) GLOBAL MIDDLEWARES
//serving static files
app.use(express.static(path.join(__dirname, 'public')));
//set security HTTP headers
app.use(helmet());
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' https://unpkg.com; style-src 'self' https://unpkg.com https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' https://*.tile.openstreetmap.org https://unpkg.com data:; connect-src 'self' https://*.tile.openstreetmap.org;",
  );
  next();
});

// development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//limit requests from same IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try after one hour!',
});
app.use('/api', limiter);

//body parser , reading data from the body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

// data sanitization against NoSQL query injection
app.use(mongoSanitize());

// data sanitization against XSS
app.use(xss());

//prevent parameter pollution,like duplicate same param as sort param ex:sort=duration&sort=price
app.use(
  hpp({
    whitelist: [
      'duration',
      'difficulty',
      'ratingsAverage',
      'ratingsQuantity',
      'price',
    ],
  }),
);

//test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.cookies);
  next();
});

//routes

app.use('/', viewsRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewsRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find this ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
