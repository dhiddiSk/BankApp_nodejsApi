const express = require('express')
const auth = require('./routes/Auth.js')
const app = express()
const port = 3000

app.get('/', function (req, res) {
  res.json("Hello, Welcome to Sai's bank")
})

// new user registration
app.post('/auth/register', function (req, res, next) {
  auth.userRegistration(req, res)
})

// user login
// @type    POST
// @route    /api/auth/login
// @desc    route for login of registered users
// @access  PUBLIC
app.post('/auth/login', function (req, res, next) {
  auth.login(req, res)
})

app.get('/home', function (req, res, next) {

})

app.listen(port, () => {
  console.log(`App is listening at port number ${port}`)
})
