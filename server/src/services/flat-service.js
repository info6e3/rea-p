const Database = require("../database");

class FlatService {
    async getFlatsById(id) {
        const query = `SELECT * FROM flats\n` +
            `WHERE id = ${id}`;
        const {rows} = await Database.dbClient.query(query)
        return rows[0];
    }
    async getFlatsWithinBounds([x1, y1], [x2, y2]) {
        const query = `SELECT * FROM flats\n` +
            `WHERE active = TRUE AND\n` +
            `coordinates[1] >= ${x1} AND coordinates[1] <= ${x2} AND\n` +
            `coordinates[2] >= ${y1} AND coordinates[2] <= ${y2}`;
        const {rows} = await Database.dbClient.query(query)
        return rows;
    }
    async getNearestFlats(point, lim) {
        const query =  {
            text: `SELECT * FROM get_nearest_flats($1, $2)`,
            values: [point, lim]
        }
        const {rows} = await Database.dbClient.query(query)
        return rows;
    }

    async postFlat(flat) {
        const query =  {
            text: `INSERT INTO flats (title, type, address, price, photos, description, coordinates, owner, active)
                    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
            values: [flat.title, flat.type, flat.address, flat.price, flat.photos, flat.description, flat.coordinates, flat.owner, true]
        }
        const {rows} = await Database.dbClient.query(query)
        return rows[0];
    }

    async getFlatsByOwner(owner) {
        const query = `SELECT * FROM flats WHERE owner = ${owner}`;
        const {rows} = await Database.dbClient.query(query)
        return rows;
    }
}

module.exports = new FlatService();