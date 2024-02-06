// SETUP FILES
const express = require('express');
const app = express();
// const PORT = 3000;
const mongoose = require('mongoose');
const Log = require('./models/logs.js')
const methodOverride = require('method-override');
const db = mongoose.connection;
const show = console.log;
const Controller = require('./controllers/controller.js');
const session = require('express-session')
const bcrypt = require('bcrypt')
const User = require('./models/users.js');

// Process.env
require('dotenv').config() 
const PORT = process.env.PORT || 3000;
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/captainslog'
const userController = require('./controllers/users_controller.js')

// MIDDLEWARE
app.use(express.urlencoded({extended:false}));   //allows use of req.body
app.use(methodOverride('_method'))
app.use(express.static('public'));
app.use(session({
    secret: 'SECRET', //process.env.SECRET,
     resave: false,
      saveUninitialized: false
    }))
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

// CONTROLLERS
app.use('/logs', Controller);
app.use('/user', userController)

// HOME ROUTE
app.get ('/', (req,res) => {
    res.redirect('/logs')
})

// IS AUTHENTICATED
const isAuthenticated = (req,res,next) => {
    if (req.session.currentUser) {
        return next()
    } else {
        res.redirect('/sessions/new')
    }
}

// AUTHORIZATION ROUTES
app.get('/sessions/new', (req,res) => {
    res.render('sessions/New', {
    currentUser: req.session.currentUser})
})

app.post('/sessions/', (req,res) => {

    // SEE IF USER EXISTS
    User.findOne({username:req.body.username}, (error, foundUser) => {
        if(error) {
            // SEND IF ERROR
            res.send(error)
        } else if (!foundUser) {
            // IF USER DOESN'T EXIST, SEND TO SIGNUP
            res.redirect('/user/new')
        } else {
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                // CHECK PASSWORD, SUCCESS, SEND TO STORE PAGE
                req.session.currentUser = foundUser.username
                res.redirect('/logs/')
            } else {
                // FAIL, SEND WRONG PASSWORD
                res.send(`Sorry, that password is incorrect.<br/>
                <a href="/logs">Click Here to Return to the Captain's Log</a>`)
            }
        }
    
    })
})

// Destroys session 
app.delete('/sessions/', (req,res) => {
    req.session.destroy(() => {
        res.redirect('/sessions/New')
    })
})

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, }); //useFindAndModify: true});
db.once('open', ()=> {
    show('Now connected to mongo');
});


// LISTEN ROUTE
app.listen(PORT, () => {
    show(`Listening on port: ${PORT}...`);
})