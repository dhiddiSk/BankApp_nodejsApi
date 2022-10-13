const express = require('express');
const userReg = require('../models/userInfo.js');
const bycrypt = require('bcryptjs');
const jsonwt = require('jsonwebtoken');
const secret = require('../setup/constants.js');
const app = express();

const jwtTokenGeneration = function (payload) {
  const token = jsonwt.sign(payload, secret, { expiresIn: 3600 });
  return token;
};

const userRegistration = async function (req, res) {
    const newUser = new userReg({
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
  userRegistration(req, res);
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
