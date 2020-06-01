const express = require('express')
const Controller = express.Router()
const show = console.log
const mongoose = require('mongoose')
const Log = require('../models/logs.js')

// IS AUTHENTICATED
const isAuthenticated = (req,res,next) => {
    if (req.session.currentUser) {
        return next()
    } else {
        res.redirect('/sessions/new')
    }
}
/// ROUTES ///
// MAIN ROUTE
// Controller.get
// INDEX ROUTE
Controller.get('/', (req,res) => {
    const findAllLogs = (error, allLogs) => {
        if (error) {
            show(error)
        } else {
            const props = {
                logs: allLogs,
                username:req.session.currentUser
            }
            // show(allLogs)
            res.render('Index', props)
        }
    }
    Log.find({}, findAllLogs)
})

// NEW ROUTE
Controller.get('/new', isAuthenticated, (req,res) => {
    res.render('New')
});

// DELETE ROUTE
Controller.delete('/:id', isAuthenticated, (req,res) => {

    Log.findByIdAndRemove(req.params.id, (error, thisLog) => {
        if (error) {
            show(error)
        } else {
            res.redirect('/logs')
        }
    })
})

// EDIT ROUTE
Controller.get('/:id/edit', isAuthenticated, (req,res) => {
    Log.findById(req.params.id, (error, logToEdit) => {
        res.render('Edit.jsx', {
            logs: logToEdit
        })
    })
})

//SEED ROUTE
Controller.get('/seed', isAuthenticated, (req,res) => {
    Log.create([
        {
            title: `Captain's Log #1`,
            entry: `Today I baked a pie`,
            isBroken: false
        },
        {
            title: `Captain's Log #2`,
            entry: `Today I read a book`,
            isBroken: false 
        },
        {
            title: `Captain's Log #3`,
            entry: `Today I broke the ship`,
            isBroken: true
        }
    ], (error, newLogs) => {
        res.redirect('/logs')
    })
})
// PUT ROUTE
Controller.put('/:id', isAuthenticated, (req, res)=>{
    if(req.body.isBroken === 'on'){
        req.body.isBroken = true;
    } else {
        req.body.isBroken = false;
    }
    Log.findByIdAndUpdate(req.params.id, req.body, {new:true}, (error, updatedLog) => {
        // res.send(updatedLog);
        // res.redirect('/logs')
        res.redirect(`/logs/${req.params.id}`)
    })
    // res.send(req.body);
});

// SHOW ROUTE
Controller.get('/:id', (req,res) => {
    Log.findById(req.params.id, (error, thisLog) => {
        if (error) {
            show(error)
        } else {
            res.render('Show', {
                logs: thisLog,
                username:req.session.currentUser
            })
        }
    })
})



// CREATE ROUTE
Controller.post('/', isAuthenticated, (req,res) => {
    if (req.body.isBroken === 'on') {
        req.body.isBroken = true 
    } else {req.body.isBroken = false}
    // res.send(req.body)

    Log.create(req.body, (error, newLog) => {
        if (error) {
            show(error)
        } else {
            res.redirect('/logs')
        }
    })
})



// EXPORTS ///
module.exports = Controller