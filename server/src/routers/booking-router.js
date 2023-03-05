const {Router} = require('express')
const bookingController = require('../controllers/booking-controller')
const errorMiddleware = require("../middleware/error-middleware");
const authMiddleware = require("../middleware/auth-middleware");

const bookingRouter = new Router();

bookingRouter.get('/get-booking-list-for-user', authMiddleware, bookingController.getBookingListForUser);
bookingRouter.get('/get-booking-list-for-owner', authMiddleware, bookingController.getBookingListForOwner);

//bookingRouter.get('/get-booking-list-by-user-id', authMiddleware, bookingController.getBookingListByUserId);
bookingRouter.get('/get-booking-dates', bookingController.getBookingDates);
bookingRouter.post('/post-booking', authMiddleware, bookingController.postBooking);
bookingRouter.post('/change-booking-status', authMiddleware, bookingController.changeBookingStatus);
bookingRouter.use(errorMiddleware);

module.exports = bookingRouter;