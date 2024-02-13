const db = require('../config/database');

class Rate {
  static getAll(callback) {
    const query = `SELECT 
      r.*,
      rt.rate_name, 
      rt.icon 
      FROM rates r
      LEFT JOIN rate_types rt ON r.rate_type = rt.id_rate_type`;

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
    const query = `SELECT 
      r.*,
      rt.rate_name, 
      rt.icon
      FROM rates r
      LEFT JOIN rate_types rt ON r.rate_type = rt.id_rate_type
      WHERE id_rate = ?`;

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


  static getByMovie(id_movie ,callback) {
    const query = `
    SELECT
      r.movie_id,
      AVG(r.rate_value) AS avg_rate_value,
      r.rate_type, 
      rt.rate_name, 
      rt.icon, 
      u.username
    FROM rates r
    LEFT JOIN rate_types rt ON r.rate_type = rt.id_rate_type
    JOIN users u ON r.user_id = u.id_user
    WHERE r.movie_id = ?
    GROUP BY r.movie_id, rt.id_rate_type, u.username;`

    db.all(query, id_movie, (err, result) => {
      if (err) {
        console.log("Select query error: "+err)
        callback(err, null);
      } else {
        console.log("Select query result: "+result)
        callback(null, result);
      }
    });
  }

  static getByUser(id_user, callback) {
    const query = `SELECT 
      r.*,
      rt.rate_name, 
      rt.icon 
      FROM rates r
      LEFT JOIN rate_types rt ON r.rate_type = rt.id_rate_type
      WHERE r.user_id = ?`;

    db.all(query, id_user, (err, result) => {
      if (err) {
        console.log("Select query error: "+err)
        callback(err, null);
      } else {
        console.log("Select query result: "+result)
        callback(null, result);
      }
    });
  }
  static getCountByUser(id_user, callback) {
    const query = `SELECT 
      COUNT(DISTINCT movie_id) AS rates
      FROM rates
      WHERE user_id = ?;`;

    db.all(query, id_user, (err, result) => {
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
    const {user_id, movie_id, rate_type, rate_value, rate_date} = rateData    
    const insertString='INSERT INTO rates (user_id, movie_id, rate_type, rate_value, rate_date) VALUES (?, ?, ?, ?, ?)'

    db.run(insertString, [user_id, movie_id, rate_type, rate_value, rate_date], (err) => {
      if (err) {
        console.log("Insert query error: "+err)
        callback(err, null);
      } else {
        db.get('SELECT last_insert_rowid() as id_rate', (err, row) => {
          if (err) {
              console.log("Select query error: " + err);
              callback(err, null);
          } else {
              var id_rate = row.id_rate;
              callback(null, { message: 'Rate added successfully', id_rate: id_rate });
          }
        });
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
