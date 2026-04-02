'use strict'

const createError = require('http-errors')
const express = require('express');
const logger = require('morgan');
const app = module.exports = express();
const port = 3000;

var users = [
    { name: 'mukulkashyap' },
    { name: 'mkashyap' },
    { name: 'mukulk' },
    { name: 'mk' },
    { name: 'mukul' }
];



app.param(['to', 'from'], (req, res, next, num, name) => {
    req.params[name] = parseInt(num, 10);
    if (isNaN(req.params[name])) {
        next(createError(400, 'failed to parseInt' + num));
    } else {
        next();
    }
});

app.param('user', (req, res, next, id) => {
    req.user = users[id];
    if (req.user) {
        next();
    } else {
        next(createError(404, 'failed to find user'));
    }
});

app.get('/', (req, res) => {
    res.send("Please visit /user/0 or /user/0-4");
})

app.get('/user/:user', (req, res) => {
    res.send(req.user);
});

app.get('/users/:from-:to', (req, res) => {
    res.send(users.slice(req.params.from, req.params.to + 1));
});

app.listen(port);