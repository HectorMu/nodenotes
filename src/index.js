const express = require('express')
const path = require('path')
const morgan = require('morgan')   
const session = require('express-session')
//const myConnection = require('express-myconnection')
const flash = require('connect-flash')  
const cookieParser = require('cookie-parser')   
const MySqlSessStore = require('express-mysql-session')(session)
const bCyrpt = require('bcryptjs')
const dotenv = require ('dotenv')
const passport = require('passport')
const passportLocal = require('passport-local').Strategy
require("./lib/passport")
const Dbpool = require('./database')

const app = express()
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

//dotenv path config
dotenv.config({ 
    path: path.resolve(__dirname, './env/.env') 
 })

//importing routes
const usersRoutes = require('./routes/usersRoutes')
const profileRoutes = require('./routes/profileRoutes')
const authRoutes = require('./routes/authRoutes')
const noteRoutes = require('./routes/notesRoutes')
//Middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())

//configuracion para guardar la sessiones
let options ={
    host:process.env.DB_HOST ,
    port: 3306,
    user: process.env.DB_USER ,
    password: process.env.DB_PASSWORD ,
    database:process.env.DB_DATABASE,
};
app.use(cookieParser());
app.use(session({
    secret:"secret",
    resave:false,
    saveUninitialized:false,
    store: new MySqlSessStore(options)
}))


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

//usando las rutas
app.use('/',usersRoutes)
app.use('/',authRoutes)
app.use('/',profileRoutes)
app.use('/',noteRoutes)

//render routes
app.get('/',(req, res)=>{
    res.render('index')
})
app.get('/admin',async(req, res)=>{
    await res.render('adminlogin')
})
app.get('/signup',(req, res)=>{
    res.render('signup')
})
app.get('/login',(req, res)=>{
    res.render('login')
})
app.get('/profile',(req, res)=>{
    res.render('userprofile')
})
app.get('/mynotes',(req, res)=>{
    res.render('mynotes');
})


//static files (css, html, js, media resources)
app.use(express.static(path.join(__dirname,"public")))
app.use((_, res) => res.redirect("/"));
let port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log('Server started on port', port)
})
