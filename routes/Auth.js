const express = require('express');
const userReg = require('../models/userInfo.js');
const bycrypt = require('bcryptjs');
const jsonwt = require('jsonwebtoken');
const secret = require('../setup/constants.js');
const app = express();

const jwtTokenGen = function (payload) {
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
  
    const jwtToken = await jwtTokenGen(payloadForJwt);
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
/*
 Here, the logic goes is to check first of all if the email exists in the database. If exists,
 then check for the compatability of the password.
 
*/
// @type    POST
// @route    /api/auth/login
// @desc    route for login of registered users
// @access  PUBLIC

router.post("/login", (req, res) => {
  const password = req.body.password;
  const email = req.body.email;
  userReg.findOne({ email })
    .then((user) => {
      if (user) {
        bcrypt
          .compare(password, user.password)
          .then((correctPassword) => {
            if (!correctPassword) {
              return res.status(401).json({ message: "User login failure" });
            }

            const payload = {
              id: user.id,
              name: user.name,
              email: user.email,
            };

            // Generate jwt token and send it back to client
            jsonwt.sign(payload, secret, { expiresIn: 3600 }, (err, token) => {
              res.json({
                success: true,
                token: token,
              });
            });
          })
          .catch((error) => {
            console.log(`Error with passwords: ${error}`);
          });
      } else {
        return res.status(404).json({ message: "Email doesn't exists" });
      }
    })
    .catch((error) => {
      console.log(`Error while login: ${error}`);
    });
});

});

//user transactions.
app.get('/transactions', function(req, res, next){

});

//user profile
app.get('/profile', function(req, res, next){

});
