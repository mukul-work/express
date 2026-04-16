require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

const routes = require('./routes');

const app = express();

/* ================= DB ================= */
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});

/* ================= CONFIG ================= */
const PORT = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/* ================= MIDDLEWARE ================= */
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // for APIs

app.use(cookieParser());

app.use(session({
    secret: process.env.SESSION_SECRET || 'fallback_secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI
    }),
    cookie: {
        httpOnly: true,
        secure: false, // true in production (HTTPS)
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
}));

app.use(flash());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

/* ================= ERROR HANDLER ================= */
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

/* ================= SERVER ================= */
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});