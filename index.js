const express = require("express");
const auth = require('./routes/Auth.js')
const app = express();

app.get('/', function(req, res){
    res.json("Hello, Welcome to Sai's bank")
});

app.get('/auth/register', function(req, res){
    auth.
});

app.get('/auth/login', function(req, res){

});

app.get('/home', function(req, res){

});
