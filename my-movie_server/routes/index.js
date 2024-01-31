const express = require('express');
const jwt = require('jsonwebtoken');

const MovieController = require('../controllers/movieController');
const UserController = require('../controllers/userController');
const RateController = require('../controllers/rateController');
const CreatorController = require('../controllers/creatorController');

require('dotenv').config();

const router = express.Router();

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Authorization failed, access denied' });
  }

  const JWT_SECRET = process.env.JWT_SECRET;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token verification error, authorization failed' });
  }
};

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// movies
// router.get('/movies', MovieController.getAllMovies);
// router.get('/movies/:id', MovieController.getMovieById);
// router.post('/movies', MovieController.addMovie);
// router.put('/movies/:id', MovieController.updateMovie);
// router.delete('/movies/:id', MovieController.deleteMovie);

// users
router.get('/login', UserController.getUserToken);
router.get('/users', verifyToken, UserController.getAllUsers);
router.get('/users/:id', verifyToken, UserController.getUserById);
router.get('/users/username/:username', verifyToken, UserController.getUserByUsername);
router.post('/users', UserController.addUser);
router.put('/users/:id', verifyToken, UserController.updateUser);
router.delete('/users/:id', verifyToken, UserController.deleteUser);

// rates
// router.get('/rates', RateController.getAllRates);
// router.get('/rates/:id', RateController.getRateById);
// router.get('/rates/user/:idUser', RateController.getRatesByUser);
// router.get('/rates/movie/:idMovie', RateController.getRatesByMovie);
// router.post('/rates', RateController.addRate);
// router.put('/rates/:id', RateController.updateRate);
// router.delete('/rates/:id', RateController.deleteRate);

module.exports = router;
