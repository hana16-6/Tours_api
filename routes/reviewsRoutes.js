const express = require('express');
const reviewsController = require('../controllers/reviewsController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protectRoutes);
router
  .route('/')
  .get(reviewsController.getAllReviews)
  .post(
    authController.restrictTo('user'),
    reviewsController.setTourUserIds,
    reviewsController.createReview,
  );

router
  .route('/:id')
  .get(reviewsController.getReview)
  .patch(
    authController.restrictTo('user', 'admin'),
    reviewsController.updateReview,
  )
  .delete(
    authController.restrictTo('user', 'admin'),
    reviewsController.deleteReview,
  );

module.exports = router;
