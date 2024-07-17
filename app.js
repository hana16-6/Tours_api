const express = require('express');
const morgan = require('morgan');

const AppError = require('./utilities/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/toursRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find this ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
