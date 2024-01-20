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
    var insertData = []
    if(img){
      insertString='INSERT INTO movies (title, release, img) VALUES (?, ?, ?)'
      insertData = [title, release, img]
    }
    else{
      insertString='INSERT INTO movies (title, release) VALUES (?, ?)'
      insertData = [title, release]
    }

    db.run(insertString, insertData, function (err) {
      if (err) {
        console.log("Insert query error:"+err)
        callback(err, null);
      } else {
        callback(null, {});
      }
    });
  }

  static deleteMovie(id, callback) {
    db.run('DELETE FROM movies WHERE id_movie = ?', [id], function (err) {
      if (err) {
        console.log("Delete query error:"+err)
        callback(err, null);
      } else {
        callback(null, { message: 'Movie deleted successfully' });
      }
    });
  }
}

module.exports = Movie;
