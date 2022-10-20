const express = require("express");
const app = express();


app.get('/', function(req, res){
    res.json("Hello, Welcome to Sai's bank")
});
