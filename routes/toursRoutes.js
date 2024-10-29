const express = require('express');
const tourController = require('../controllers/toursController');
const authController = require('../controllers/authController');
const reviewsRouter = require('./reviewsRoutes');

const router = express.Router();

router.use('/:tourId/reviews', reviewsRouter);
router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);
router.route('/tour-status').get(tourController.getTourStatus);
router
  .route('/monthly-plan/:year')
  .get(
    authController.protectRoutes,
    authController.restrictTo('admin', 'lead-guide', 'guide'),
    tourController.getMonthlyPlan,
  );
router
  .route('/')
  .get(tourController.getAllTours)
  .post(
    authController.protectRoutes,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.createTour,
  );
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(
    authController.protectRoutes,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.updateTour,
  )
  .delete(
    authController.protectRoutes,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour,
  );

module.exports = router;
