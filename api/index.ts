import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
const application = express();

// Home Page of the application
application.get('/', function (req, res) {
        res.json("Hello, Welcome to Sai's bank")
})

// Connecting to the database
// mongoose.connect(process.env.mongoDatabaseURL!)
//         .then(() => console.log('Database has been sucessfully connected'))
//         .catch((error) => console.log(`Error while connecting to the database${error}`))

application.listen(process.env.userProfileApplicationPortNumber!, () => {
                console.log(`App is listening at port number ${process.env.userProfileApplicationPortNumber!}`)
})
