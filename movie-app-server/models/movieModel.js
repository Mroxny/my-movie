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

  static addMovie(movieData, callback) {
    const {title, release, img} = movieData

    var insertString = ''
    if(img){
      insertString='INSERT INTO movies (title, release, img) VALUES (?, ?, ?)'
    }
    else{
      insertString='INSERT INTO movies (title, release) VALUES (?, ?)'
    }

    db.run(insertString, ...movieData, function (err) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, {});
      }
    });
  }

  static deleteMovie(id, callback) {
    db.run('DELETE FROM movies WHERE id_movie = ?', [id], function (err) {
      if (err) {
        console.log(err)
        callback(err, null);
      } else {
        callback(null, { message: 'Movie deleted successfully' });
      }
    });
  }
}

module.exports = Movie;
