//
//
const path = require('path')
const mongoose = require('mongoose')
const express = require('express')

// packages
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const connectMongoDB = require('./db/mongodb-conn')
const CF = require('./conf/conf_app')


const app = express()

if ( CF.server.ENV !== 'production' ) {
    const morgan = require('morgan')
    app.use( morgan('dev') )
}

app.use( express.json() ) // to parse json body
app.use( cookieParser() )
app.use( cors({
    // origin: 'http://localhost:5173', // frontend link
    origin: "*",
    credentials: true
}))
app.use( fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp'
}))

console.log( '__dirname   :  ' + __dirname)
console.log( '[map image] :  ' + CF.server.path_image + ' -> ' + path.join(__dirname, CF.path.image) )
app.use( '/upload/image', express.static( path.join(__dirname, CF.path.image) ) )
console.log( '[map video] :  ' + CF.server.path_video + ' -> ' + path.join(__dirname, CF.path.video) )
app.use( '/upload/video', express.static( path.join(__dirname, CF.path.video) ) )


// connections
// Database Connection
mongoose.Promise = global.Promise
Promise.resolve(app)
    .then( connectMongoDB() )
    .catch(err => console.error.bind(console, `MongoDB connection error: ${JSON.stringify(err)}`))

// mount route
app.use('/api/test', require('./routes/test') )
app.use('/api/v1/auth', require('./routes/user') )
app.use('/api/v1/course', require('./routes/course') )
app.use('/api/v1/profile', require('./routes/profile') )
app.use('/api/v1/payment', require('./routes/payments') )

// Default Route
app.get('/', (req, res) => {
    // console.log('Your server is up and running..!')
    res.send(`<div>
    This is Default Route
    <p>Everything is OK</p>
    </div>`)
})


module.exports = app
