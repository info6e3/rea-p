const bookingService = require('../services/booking-service');
class BookingController {
    async postBooking(req, res, next) {
        try {
            const {bookingOrder} = req.body;
            const user = req.user;
            bookingOrder.user_id = user.id;
            const booking = await bookingService.postBooking(bookingOrder);
            return res.status(200).send(booking)
        } catch(e) {
            next(e);
        }
    }
    async getBookingDates(req, res, next) {
        try {
            const {flat_id} = req.query;
            const datesList = await bookingService.getBookingDates(flat_id);
            return res.status(200).send(datesList)
        } catch(e) {
            next(e);
        }
    }

    async getBookingListForUser(req, res, next) {
        try {
            const user = req.user;
            const user_id = user.id;
            const bookingList = await bookingService.getBookingListForUser(user_id);
            return res.status(200).send(bookingList)
        } catch(e) {
            next(e);
        }
    }

    async getBookingListForOwner(req, res, next) {
        try {
            const user = req.user;
            const user_id = user.id;
            const bookingList = await bookingService.getBookingListForOwner(user_id);
            return res.status(200).send(bookingList)
        } catch(e) {
            next(e);
        }
    }

    async changeBookingStatus(req, res, next) {
        try {
            const {id, status} = req.body;
            const bookingList = await bookingService.changeBookingStatus(id, status);
            return res.status(200).send(bookingList)
        } catch(e) {
            next(e);
        }
    }
}

module.exports = new BookingController();