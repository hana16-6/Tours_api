const express = require('express');
const reviewsController = require('../controllers/reviewsController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(reviewsController.getAllReviews)
  .post(
    authController.protectRoutes,
    authController.restrictTo('user'),
    reviewsController.createReview,
  );

router
  .route('/:id')
  .patch(reviewsController.updateReview)
  .delete(reviewsController.deleteReview);

module.exports = router;
