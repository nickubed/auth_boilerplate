// Required node modules
require('dotenv').config() //Provide access to variables inside .env file.
let express = require('express')
let layouts = require('express-ejs-layouts')

// Declare express app variable
let app = express();

// Set up and middleware
app.set('view engine', 'ejs')
app.use(layouts)
app.use('/', express.static('static'))
app.use(express.urlencoded({ extended: false }))
// Add any controllers
app.use('/auth', require('./controllers/auth'))
// Add home or catch-all routes
app.get('/', (req, res) => {
    res.render('home')
})

app.get('*', (req, res) => {
    res.render('error404')
})

app.listen(process.env.PORT || 3000, () => {console.log('🦊Singin and Dancin🐰')})