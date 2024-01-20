const Movie = require('../models/movieModel');

class MovieRepository {
  static getAllMovies(callback) {
    Movie.getAll(callback);
  }

  static getMovieById(id, callback) {
    Movie.getById(id, callback);
  }

  static addMovie(movieData, callback) {
    Movie.addMovie(movieData, callback);
  }

  static updateMovie(id, updatedData, callback) {
    Movie.updateMovie(id, updatedData, callback);
  }

  static deleteMovie(id, callback) {
    Movie.deleteMovie(id, callback);
  }
}

module.exports = MovieRepository;
