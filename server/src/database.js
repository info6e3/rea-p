const pkg = require('pg');
const {Client} = pkg;

class Database {
    static dbClient = null;
    static is_connected = false;
    static Init(database) {
        Database.dbClient = new Client(database); // подключение к бд
        Database.dbClient
            .connect()
            .then(() => {
                Database.is_connected = true;
                console.log('Connected to database.sql.')
            })
            .catch((err) => console.error('Connection to database error.', err.stack))
    }
}

module.exports = Database;