'use strict'

const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const app = module.exports = express();

app.use(logger('dev'));
app.use(cookieParser('key'));
app.use(express.urlencoded());

app.get('/', (req,res) => {
    if(req.cookies.remember){
        res.send('We remember you. <a href="/forget">Click to forget</a>');
    }
    else{
        res.send('<form method="post"><input type="checkbox" name="remember">Send cookie to remember</input><input type="submit" value="Submit"></input></form>')
    }
})

app.get('/forget', (req,res) => {
    res.clearCookie('remember');
    res.redirect(req.get('Referer') || '/');
});

app.post('/', (req,res) => {
    if(req.body.remember){
        res.cookie('remember', true, {maxAge: 900000});
    }
    res.redirect(req.get('Referer') || '/')
});

if(!module.parent){
    app.listen(3000, () => {
        console.log('Server is listening on port 3000');
    });
}