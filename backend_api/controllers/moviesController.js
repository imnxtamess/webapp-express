const connection = require('../database/movie_db')

// index route for movies

function index(req, res) {
  res.send('This is the movie list')
}

// show route for a single movie

function show(req, res) {
  movieId = Number(req.params.id)
  res.send(`This is the movie with id ${movieId}`)
}


module.exports = {
  index,
  show
}