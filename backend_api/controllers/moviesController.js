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
  const movieId = Number(req.params.id)

  const sql = 'SELECT * FROM movies WHERE id = ?'
  const sqlReviews = 'SELECT * FROM reviews WHERE movie_id = ?'

  connection.query(sql, [movieId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message })
    if (results.length === 0) return res.status(404).json({ error: 'Movie not found' })
    const movie = results[0]
    connection.query(sqlReviews, [movieId], (err, reviews) => {
      if (err) return res.status(500).json({ error: err.message })
      movie.reviews = reviews
      res.json(movie)
    })
  })
}

// post route to create a review for a movie

function post(req, res) {
  const { movie_id, name, vote, text, created_at, updated_at } = req.body

  const values = [movie_id, name, vote, text, created_at, updated_at]
  const sql = 'INSERT INTO reviews (movie_id,name,vote,text) VALUES (?,?,?,?)'
  connection.query(sql, values, (err, results) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json({ message: 'Review posted successfully!' })
  })
}


module.exports = {
  index,
  show,
  post
}