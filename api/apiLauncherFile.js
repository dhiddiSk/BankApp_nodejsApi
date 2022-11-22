import * as express from 'express'
import * as auth from './controllers/userAuth.js'
import { applicationPortNumber } from './setup/constants.js'

const app = express()

app.get('/', function (req, res) {
  res.json("Hello, Welcome to Sai's bank")
})

// new user registration
app.post('/auth/register', function (req, res, next) {
  auth.userRegistration(req, res)
})

// @type    POST
// @route    /api/auth/login
// @desc    route for login of registered users
// @access  PUBLIC
app.post('/auth/login', function (req, res, next) {
  auth.login(req, res)
})

app.get('/home', function (req, res, next) {

})

app.listen(applicationPortNumber, () => {
  console.log(`App is listening at port number ${applicationPortNumber}`)
})
