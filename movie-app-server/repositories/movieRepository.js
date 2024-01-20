// movieRepository.js

const Movie = require('../models/movieModel');

class MovieRepository {
  static getAllMovies(callback) {
    Movie.getAll(callback);
  }

  static addMovie(movieData, callback) {
    Movie.addMovie(movieData, callback);
  }

  static deleteMovie(id, callback) {
    Movie.deleteMovie(id, callback);
  }
}

module.exports = MovieRepository;
