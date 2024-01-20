// movieRoutes.js

const express = require('express');
const MovieController = require('../controllers/movieController');

const router = express.Router();

// Dodaj obsługę CORS dla wszystkich domen
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

router.get('/movies', MovieController.getAllMovies);
router.post('/movies', MovieController.addMovie);
// router.put('/movies/:id', MovieController.updateMovieRating);
router.delete('/movies/:id', MovieController.deleteMovie);

module.exports = router;
