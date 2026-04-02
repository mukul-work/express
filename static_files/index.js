'use strict'

const express = require('express');
const logger = require('morgan');
const path = require('node:path');
const port = 3000;

const app = module.exports = express();

app.use(logger('dev'));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/static',express.static(path.join(__dirname, 'public')));
app.use('/static',express.static(path.join(__dirname, 'public','css')));
app.use('/static',express.static(path.join(__dirname, 'public','js')));


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});