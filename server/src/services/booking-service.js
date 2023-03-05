const Database = require("../database");
const flatService = require('../services/flat-service')


async function getBookingListByFlatId(flat_id) {
    const query = `SELECT * FROM booking\n` +
        `WHERE flat_id = ${flat_id}`;
    const {rows} = await Database.dbClient.query(query)
    return rows;
}

async function getBookingById(id) {
    const query = `SELECT * FROM booking\n` +
        `WHERE id = ${id}`;
    const {rows} = await Database.dbClient.query(query)
    return rows[0];
}

class BookingService {
    async getBookingDates(flat_id) {
        const query = `SELECT day_start, day_end FROM booking\n` +
            `WHERE flat_id = ${flat_id} AND accept > 0`;
        const {rows} = await Database.dbClient.query(query)
        return rows;
    }

    // booking[]
    async getBookingListByUserId(user_id) {
        const query = `SELECT * FROM booking\n` +
            `WHERE user_id = ${user_id}`;
        const {rows} = await Database.dbClient.query(query)
        return rows;
    }

    // booking + .flat = flat
    async getBookingListForUser(user_id) {
        const query = `SELECT * FROM booking\n` +
            `WHERE user_id = ${user_id}`;
        const {rows} = await Database.dbClient.query(query)
        for(let i = 0; i < rows.length; i++) {
            const flat = await flatService.getFlatsById(rows[i].id);
            rows[i].flat = flat;
        }
        return rows;
    }

    // booking + .flat = flat //AND .user = user
    async getBookingListForOwner(user_id) {
        const flats = await flatService.getFlatsByOwner(user_id);
        const bookingList = [];
        for(let i = 0; i < flats.length; i++) {
            console.log(flats[i])
            const bookingListFlat = await getBookingListByFlatId(flats[i].id);
            bookingListFlat.forEach((booking, index) => {
                bookingListFlat[index].flat = flats[i];
            })
            bookingList.push(...bookingListFlat)
        }
        console.log(bookingList)
        return bookingList;
    }

    async postBooking(booking) {
        const query =  {
            text: `INSERT INTO booking (user_id, flat_id, day_start, day_end, accept)
                   VALUES($1, $2, $3, $4, $5) RETURNING *`,
            values: [booking.user_id, booking.flat_id, booking.day_start, booking.day_end, 2]
        }
        const {rows} = await Database.dbClient.query(query)
        return rows[0];
    }

    async changeBookingStatus(id, status) {
        const query =  `UPDATE booking SET accept = ${Number(status)} WHERE id = ${id}`
        await Database.dbClient.query(query)
        return true;
    }
}

module.exports = new BookingService();