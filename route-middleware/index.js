'use strict'

const express = require('express');
const app = module.exports = express();

const users = [
    {id:0, name:'Aman', role:'admin'},
    {id:1, name:'Amit', role:'editor'},
    {id:2, name:'Ajay', role:'viewer'},
]


function loadUser(req, res, next) {
    const user = users[req.params.id];
    if (user) {
        req.user = user;
        next();
    } else {
        res.status(404).send('User not found');
    }
}

function andRestrictToSelf(req, res, next) {
    if(req.authenticatedUser.id === req.user.id) {
        next();
    } else {
        res.status(403).send('Forbidden');
    }
}

function andRestrictTo(role) {
    return function(req, res, next) {
        if(req.authenticatedUser.role === role) {
            next();
        } else {
            res.status(403).send('Forbidden');
        }
    }
}

app.use((req, res, next) => {
    req.authenticatedUser = users[0]; 
    next();
})


app.use(function(req, res, next){
  req.authenticatedUser = users[0];
  next();
});

app.get('/', function(req, res){
  res.redirect('/user/0');
});

app.get('/user/:id', loadUser, function(req, res){
  res.send('Viewing user ' + req.user.name);
});

app.get('/user/:id/edit', loadUser, andRestrictToSelf, function(req, res){
  res.send('Editing user ' + req.user.name);
});

app.delete('/user/:id', loadUser, andRestrictTo('admin'), function(req, res){
  res.send('Deleted user ' + req.user.name);
});

if(!module.parent){
    app.listen(3000);
    console.log("Listening on port 3000");
}