const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3000;
const serverError = require('./middleware/serverError')
const notFound = require('./middleware/notFound')
const moviesRouter = require('./routers/movies')

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})


// 👉🏻 ROUTES

app.get('/', (req, res) => {
  res.send('Welcome to the Movies API Server!')
})

app.use('/api/v1/movies', moviesRouter)

// 👉🏻 Middlewares

//Cors Middleware
app.use(cors(
  {
    origin: process.env.FRONT_URL || 'http://localhost:5173'
  }
))

// Body Parser Middleware
app.use(express.json())

// Static Assets Middleware
app.use(express.static('public'))

// Server Error Handler Middleware
app.use(serverError)

// Client Error Handler Middleware
app.use(notFound)