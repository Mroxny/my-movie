// movieRepository.js

const Movie = require('../models/movieModel');

class MovieRepository {
  static getAllMovies(callback) {
    Movie.getAll(callback);
  }

  static addMovie(title, rating, callback) {
    Movie.addMovie(title, rating, callback);
  }

  static updateMovieRating(id, newRating, callback) {
    Movie.updateMovieRating(id, newRating, callback);
  }

  static deleteMovie(id, callback) {
    Movie.deleteMovie(id, callback);
  }
}

module.exports = MovieRepository;
