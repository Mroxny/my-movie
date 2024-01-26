const express = require('express');
const MovieController = require('../controllers/movieController');
const UserController = require('../controllers/userController');
const RateController = require('../controllers/rateController');
const CreatorController = require('../controllers/creatorController');


const router = express.Router();

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
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
router.get('/users', UserController.getAllUsers);
router.get('/users/:id', UserController.getUserById);
router.get('/users/email/:email', UserController.getUserByEmail);
router.post('/users', UserController.addUser);
router.put('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);

// rates
router.get('/rates', RateController.getAllRates);
router.get('/rates/:id', RateController.getRateById);
router.get('/rates/user/:idUser', RateController.getRatesByUser);
router.get('/rates/movie/:idMovie', RateController.getRatesByMovie);
router.post('/rates', RateController.addRate);
router.put('/rates/:id', RateController.updateRate);
router.delete('/rates/:id', RateController.deleteRate);

// creators
router.get('/creators', CreatorController.getAllCreators);
router.get('/creators/:id', CreatorController.getCreatorById);
router.get('/creators/movie/:idMovie', CreatorController.getCreatorsByMovie);
router.post('/creators', CreatorController.addCreator);
router.put('/creators/:id', CreatorController.updateCreator);
router.delete('/creators/:id', CreatorController.deleteCreator);

module.exports = router;
