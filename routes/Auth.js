import newUserReg from "../models/userInfo.js";
import express from "express";
import bycrypt from "bcryptjs";
import jsonwt from "jsonwebtoken";

const express = require('express');
const app = express();

const registration = async function (req, res) {
    const newUser = new newUserReg({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      userName: req.body.userName
    });
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(newUser.password, salt);
    newUser.password = hashpassword;
    const userSignup = await newUser.save();
  
    const payloadForJwt = {
      id: userSignup.id,
      name: userSignup.name,
      email: userSignup.email,
    };
  
    const jwtToken = await jwtTokenGeneration(payloadForJwt);
    res.status(200).json({
      success: true,
      token: jwtToken,
    });
  };

//new user registration.
app.post('/register', function(req, res, next){
    registration(req, res);
});

//user login.
app.post('/login', function(req, res, next){

});

//user transactions.
app.get('/transactions', function(req, res, next){

});

//user profile
app.get('/profile', function(req, res, next){

});
