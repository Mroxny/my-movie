const express = require('express');
const MovieController = require('../controllers/movieController');

const router = express.Router();

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

router.get('/movies', MovieController.getAllMovies);
router.get('/movies/:id', MovieController.getMovieById);
router.post('/movies', MovieController.addMovie);
router.put('/movies/:id', MovieController.updateMovie);
router.delete('/movies/:id', MovieController.deleteMovie);

module.exports = router;
