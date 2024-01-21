const db = require('../config/database');

class Movie {
  static getAll(callback) {
    const query = `
    SELECT
      m.*,
      AVG(r.r_p) AS avg_r_p,
      AVG(r.r_ac) AS avg_r_ac,
      AVG(r.r_s) AS avg_r_s,
      AVG(r.r_au) AS avg_r_au,
      AVG(r.r_all) AS avg_r_all
    FROM movies m
    LEFT JOIN rates r ON m.id_movie = r.movie_id
    GROUP BY m.id_movie;
    `

    db.all(query, (err, result) => {
      if (err) {
        console.log("Select query error: "+err)
        callback(err, null);
      } else {
        console.log("Select query result: "+result)
        callback(null, result);
      }
    });
  }

  static getById(id ,callback) {
    const query = `
    SELECT
      m.*,
      AVG(r.r_p) AS avg_r_p,
      AVG(r.r_ac) AS avg_r_ac,
      AVG(r.r_s) AS avg_r_s,
      AVG(r.r_au) AS avg_r_au,
      AVG(r.r_all) AS avg_r_all
    FROM movies m
    LEFT JOIN rates r ON m.id_movie = r.movie_id
    WHERE m.id_movie = ?
    GROUP BY m.id_movie;
    `
    
    db.all(query, id, (err, result) => {
      if (err) {
        console.log("Select query error: "+err)
        callback(err, null);
      } else {
        console.log("Select query result: "+result)
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

    db.run(insertString, insertData, (err) => {
      if (err) {
        console.log("Insert query error: "+err)
        callback(err, null);
      } else {
        callback(null, {});
      }
    });
  }

  static updateMovie(id, updatedData, callback) {
    const updateQuery = 'UPDATE movies SET ' + Object.keys(updatedData).map(key => `${key} = ?`).join(', ') + ' WHERE id_movie = ?';
    const values = [...Object.values(updatedData), id];

    db.run(updateQuery, values, function (err) {
      if (err) {
        console.log("Update query error: "+err)
        callback(err, null);
      } else {
        callback(null, { message: 'Movie updated successfully' });
      }
    });
  }

  static deleteMovie(id, callback) {
    db.run('DELETE FROM movies WHERE id_movie = ?', [id], (err) => {
      if (err) {
        console.log("Delete query error: "+err)
        callback(err, null);
      } else {
        callback(null, { message: 'Movie deleted successfully' });
      }
    });
  }
}

module.exports = Movie;
