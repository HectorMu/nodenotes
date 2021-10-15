require('dotenv').config()
const express = require('express')
const path = require('path')
const morgan = require('morgan')   
const session = require('express-session')
const flash = require('connect-flash')   
const MySqlSessStore = require('express-mysql-session')(session)
const passport = require('passport')
const helpers = require('./lib/helpers')
require("./lib/passport")
const Dbpool = require('./database')


const app = express()

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
app.enable('trust proxy')

app.use(helpers.httpsRedirect);

//Middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())


app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    store: new MySqlSessStore(helpers.databaseKeys())
}))

//flash, passport an passport session init
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

//global variables for messages
 app.use((req, res, next) => {
    app.locals.success_msg = req.flash("success_msg")
    app.locals.error_msg = req.flash("error_msg")
    app.locals.error = req.flash("error")
     //global variable for get the user
     app.locals.user = req.user || null
     next()
   });

//static files (css, html, js, media resources)
app.use(express.static(path.join(__dirname,"public")))

//importing and using routes
app.use('/',require('./routes/usersRoutes'))
app.use('/',require('./routes/authRoutes'))
app.use('/',require('./routes/profileRoutes'))
app.use('/',require('./routes/notesRoutes'))
app.use('/',require('./routes/indexRoutes'))

//unknown route redirect
app.use(helpers.unknownPageRedirect);

//setted port for deploy
let port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log('Server started on port', port)
})


