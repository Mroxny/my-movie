// movieModel.js

const db = require('../config/database');

class Movie {
  static getAll(callback) {
    db.all('SELECT * FROM movies', (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  }

  static addMovie(title, rating, callback) {
    db.run('INSERT INTO movies (title, rating) VALUES (?, ?)', [title, rating], function (err) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, { id: this.lastID });
      }
    });
  }

  static updateMovieRating(id, newRating, callback) {
    db.run('UPDATE movies SET rating = ? WHERE id = ?', [newRating, id], function (err) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, { message: 'Rating updated successfully' });
      }
    });
  }

  static deleteMovie(id, callback) {
    db.run('DELETE FROM movies WHERE id = ?', [id], function (err) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, { message: 'Movie deleted successfully' });
      }
    });
  }
}

module.exports = Movie;
