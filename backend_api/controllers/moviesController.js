const connection = require('../database/movie_db')

// index route for movies

function index(req, res) {
  const sql = 'SELECT * FROM movies'

  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json(results)
  })
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