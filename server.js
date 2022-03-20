/////////////////////////////////////////////////
////////////// DEPENDENCIES /////////////////////
/////////////////////////////////////////////////

require("dotenv").config() // make env variables available
const express = require("express")
const middleware = require('./utils/middleware')
const GameRouter = require('./controllers/games')
const CommentRouter = require('./controllers/comment')
const UserRouter = require('./controllers/user')
const User = require("./models/user")
// SEE MORE DEPENDENCIES IN ./utils/middleware.js
// user and resource routes linked in ./utils/middleware.js

/////////////////////////////////////////////////
///////// MIDDLEWARE + APP OBJECT ///////////////
/////////////////////////////////////////////////

const app = require("liquid-express-views")(express())

middleware(app)

/////////////////////////////////////////////////
////////////// ROUTES ///////////////////////////
/////////////////////////////////////////////////

// all routes in controllers are prepended with first arguement of app.use 
app.use('/auth', UserRouter)
app.use('/games', GameRouter)
app.use('/comments', CommentRouter)

app.get('/', (req, res) => {
    const { username, userId, loggedIn } = req.session
	res.render('index.liquid', { loggedIn, username, userId })
})

app.get('/error', (req, res) => {
	const error = req.query.error || '<p></p><center><h1><p>You rolled a natural 1, </p>you cannot find the page you are looking for<h1></center>'
    const { username, loggedIn, userId } = req.session
	res.render('error.liquid', { error, username, loggedIn, userId })
})

// if page is not found, send to error page
app.all('*', (req, res) => {
	res.redirect('/error')
})

/////////////////////////////////////////////////
////////////// APP //////////////////////////////
/////////////////////////////////////////////////

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})