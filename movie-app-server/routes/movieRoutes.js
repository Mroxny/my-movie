const express = require('express');
const MovieController = require('../controllers/movieController');

const router = express.Router();

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// movies
router.get('/movies', MovieController.getAllMovies);
router.get('/movies/:id', MovieController.getMovieById);
router.post('/movies', MovieController.addMovie);
router.put('/movies/:id', MovieController.updateMovie);
router.delete('/movies/:id', MovieController.deleteMovie);

// users
router.get('/users', MovieController.getAllUsers);
router.get('/users/:id', MovieController.getUserById);
router.post('/users', MovieController.addUser);
router.put('/users/:id', MovieController.updateUser);
router.delete('/users/:id', MovieController.deleteUser);

module.exports = router;
