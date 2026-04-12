const express = require('express');
const path = require('path');
const fs = require('fs');
const logger = require('morgan');

const app = express();
const PORT = 3000;

app.use(logger('dev'));

app.use(function(req, res, next) {
    const filePath = path.join(__dirname, 'static', req.url);
    fs.stat(filePath, function(err, fileInfo) {
        if (err) {
            next();
            return;
        }
        if(fileInfo.isFile){
            res.sendFile(filePath);
        }else{
            next();
        }
    });
});

app.use(function(req, res) {
    res.status(404);
    res.send('404 Not Found');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});