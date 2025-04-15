const router = require('express').Router()
const moviesController = require('../controllers/moviesController')

// index route for movies

router.get('/', moviesController.index)

router.get('/:id', moviesController.show)

module.exports = router