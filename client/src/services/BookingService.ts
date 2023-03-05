import BookingApi from "../api/BookingApi";
import {IBookingOrder} from "../models/IBookingOrder";

class BookingService {
    async postBooking(bookingOrder: IBookingOrder) {
        try {
            const response = await BookingApi.postBooking(bookingOrder);
            return response.data;
        } catch (e: any) {
            console.log(e.response?.data)
        }
    }

    async getBookingDates(flat_id: number) {
        try {
            const response = await BookingApi.getBookingDates(flat_id);
            return response.data;
        } catch (e: any) {
            console.log(e.response?.data)
        }
    }

    async getBookingListForUser() {
        try {
            const response = await BookingApi.getBookingListForUser();
            return response.data;
        } catch (e: any) {
            console.log(e.response?.data)
        }
    }

    async getBookingListForOwner() {
        try {
            const response = await BookingApi.getBookingListForOwner();
            return response.data;
        } catch (e: any) {
            console.log(e.response?.data)
        }
    }

    async changeBookingStatus(id: number, status: boolean) {
        try {
            const response = await BookingApi.changeBookingStatus(id, status);
            return response.data;
        } catch (e: any) {
            console.log(e.response?.data)
        }
    }

}

export default new BookingService();