// movieController.js

const MovieRepository = require('../repositories/movieRepository');

class MovieController {
  static getAllMovies(req, res) {
    MovieRepository.getAllMovies((err, result) => {
      if (err) {
        res.status(500).json({ error: 'Server error' });
      } else {
        res.json(result);
      }
    });
  }

  static addMovie(req, res) {
    const { title, rating } = req.body;

    if (!title || !rating) {
      res.status(400).json({ error: 'Invalid input data' });
      return;
    }

    MovieRepository.addMovie(title, rating, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Server error' });
      } else {
        res.json({ message: 'Movie added successfully', id: result.id });
      }
    });
  }

  static updateMovieRating(req, res) {
    const idMovie = req.params.id;
    const newRating = req.body.rating;

    if (!newRating) {
      res.status(400).json({ error: 'Invalid input data' });
      return;
    }

    MovieRepository.updateMovieRating(idMovie, newRating, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Server error' });
      } else {
        res.json(result);
      }
    });
  }

  static deleteMovie(req, res) {
    const idMovie = req.params.id;

    MovieRepository.deleteMovie(idMovie, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Server error' });
      } else {
        res.json(result);
      }
    });
  }
}

module.exports = MovieController;
