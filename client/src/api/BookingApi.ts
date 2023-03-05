import api from "../http";
import {AxiosResponse} from "axios";
import {IBookingOrder} from "../models/IBookingOrder";
import {IBooking} from "../models/IBooking";

export default class BookingApi {
    static async postBooking(bookingOrder: IBookingOrder): Promise<AxiosResponse<IBooking>> {
        return api.post('/booking/post-booking', {bookingOrder})
    }

    static async getBookingDates(flat_id: number): Promise<AxiosResponse<any>> {
        return api.get('/booking/get-booking-dates', { params: { flat_id } })
    }

    static async getBookingListForUser(): Promise<AxiosResponse<any>> {
        return api.get('/booking/get-booking-list-for-user')
    }

    static async getBookingListForOwner(): Promise<AxiosResponse<any>> {
        return api.get('/booking/get-booking-list-for-owner')
    }

    static async changeBookingStatus(id: number, status: boolean): Promise<AxiosResponse<any>> {
        return api.post('/booking/change-booking-status', {id, status})
    }

}

