import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import { passportStrategy } from './strategies/passport'
const application = express();

application.use(bodyParser.urlencoded({ extended: false }))
application.use(bodyParser.json())

//Connecting to the database
mongoose.connect(process.env.mongoDatabaseURL!)
        .then(() => console.log('Database has been sucessfully connected'))
        .catch((error) => console.log(`Error while connecting to the database${error}`))

// middleware
application.use(passport.initialize())
passportStrategy(passport)


// @type    GET
// @route    /
// @desc    Default route of application
// @access  PUBLIC
application.get('/', function (req, res) {
        res.json("Hello, Welcome to Sai's bank")
})

// @type    POST
// @route    /api/auth/login
// @desc    route for login of registered users
// @access  PUBLIC
application.post('/auth/register', function (req, res, next) {

})

//Application listening to port
application.listen(process.env.userProfileApplicationPortNumber!, () => {
        console.log(`App is listening at port number ${process.env.userProfileApplicationPortNumber!}`)
})
