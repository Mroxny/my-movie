const db = require('../config/database');

class Rate {
  static getAll(callback) {
    db.all('SELECT * FROM rates', (err, result) => {
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
    db.all('SELECT * FROM rates WHERE id_rate = ?', id, (err, result) => {
      if (err) {
        console.log("Select query error: "+err)
        callback(err, null);
      } else {
        console.log("Select query result: "+result)
        callback(null, result);
      }
    });
  }

  static getByMovie(id_movie ,callback) {
    db.all('SELECT * FROM rates WHERE movie_id = ?', id_movie, (err, result) => {
      if (err) {
        console.log("Select query error: "+err)
        callback(err, null);
      } else {
        console.log("Select query result: "+result)
        callback(null, result);
      }
    });
  }

  static getByUser(id_user ,callback) {
    db.all('SELECT * FROM rates WHERE user_id = ?', id_user, (err, result) => {
      if (err) {
        console.log("Select query error: "+err)
        callback(err, null);
      } else {
        console.log("Select query result: "+result)
        callback(null, result);
      }
    });
  }

  static addRate(rateData, callback) {
    const {movie_id, user_id, r_p, r_ac, r_s, r_au, r_all} = rateData    
    const insertString='INSERT INTO rates (movie_id, user_id, r_p, r_ac, r_s, r_au, r_all) VALUES (?, ?, ?, ?, ?, ?, ?)'

    db.run(insertString, [movie_id, user_id, r_p, r_ac, r_s, r_au, r_all], (err) => {
      if (err) {
        console.log("Insert query error: "+err)
        callback(err, null);
      } else {
        callback(null, {});
      }
    });
  }

  static updateRate(id, updatedData, callback) {
    const updateQuery = 'UPDATE rates SET ' + Object.keys(updatedData).map(key => `${key} = ?`).join(', ') + ' WHERE id_rate = ?';
    const values = [...Object.values(updatedData), id];

    db.run(updateQuery, values, function (err) {
      if (err) {
        console.log("Update query error: "+err)
        callback(err, null);
      } else {
        callback(null, { message: 'Rate updated successfully' });
      }
    });
  }

  static deleteRate(id, callback) {
    db.run('DELETE FROM rates WHERE id_rate = ?', [id], (err) => {
      if (err) {
        console.log("Delete query error: "+err)
        callback(err, null);
      } else {
        callback(null, { message: 'Rate deleted successfully' });
      }
    });
  }
}

module.exports = Rate;
