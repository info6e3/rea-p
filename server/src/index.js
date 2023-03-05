process.env.TZ = 'Europe/Moscow' //settime;

const express = require('express')
const {pid} = require('node:process')
const Database = require('./database');
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const DATABASE = JSON.parse(process.env.DATABASE) || null;
const cookieParser = require('cookie-parser')
const cors = require('cors');
const fileUpload = require("express-fileupload");

const authRouter = require('./routers/auth-router')
const flatRouter = require('./routers/flat-router')
const bookingRouter = require('./routers/booking-router')
const userRouter = require('./routers/user-router')

console.log(`This process is pid ${pid}`)
Database.Init(DATABASE);


const app = CreateServer()

app.use('/auth', authRouter)
app.use('/flat', flatRouter)
app.use('/booking', bookingRouter)
app.use('/user', userRouter)


function CreateServer() {
    const app = express();
    app.use(express.json());
    app.use(cors({
       credentials: true,
       origin: process.env.CLIENT_URL
    }))
    app.use(cookieParser());
    app.use(fileUpload());
    app.use('/images', express.static('images'));
    app.listen(PORT, () => console.log(`Сервер работает на ${PORT}`));
    return app;
}
