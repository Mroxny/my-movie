const db = require('../config/database');

class Creator {
    static getAll(callback) {
        db.all('SELECT * FROM creators', (err, result) => {
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
        db.all('SELECT * FROM creators WHERE id_creator = ?', id, (err, result) => {
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
        db.all('SELECT * FROM creators WHERE movie_id = ?', id_movie, (err, result) => {
          if (err) {
            console.log("Select query error: "+err)
            callback(err, null);
          } else {
            console.log("Select query result: "+result)
            callback(null, result);
          }
        });
      }
    
    
      static addPerson(personData, callback) {
        const {name, surname, birth_date} = personData    
        const insertString='INSERT INTO persons (name, surname, birth_date) VALUES (?, ?, ?)'
    
        db.run(insertString, [name, surname, birth_date], (err) => {
          if (err) {
            console.log("Insert query error: "+err)
            callback(err, null);
            
          } else {
            callback(null, []);
        }
        });
      }

      static getLastPerson(callback) {
        db.all('SELECT * FROM persons ORDER BY id_person DESC LIMIT 1', (err, result) => {
          if (err) {
            console.log("Select query error: "+err)
            callback(err, null);
          } else {
            console.log("Select query result: "+result)
            callback(null, result);
          }
        });
      }

      static addCreator(creatorData, callback) {
        const {movie_id, id_person, role} = creatorData    
        const insertString='INSERT INTO creators (movie_id, person_id, role) VALUES (?, ?, ?)'

        console.log("Person to be added: "+ id_person)
    
        db.run(insertString, [movie_id, id_person, role], (err) => {
          if (err) {
            console.log("Insert query error: "+err)
            callback(err, null);
          } else {
            callback(null, {message: 'Creator added successfully'});
          }
        });
      }
    
      static updateCreator(id, updatedData, callback) {
        const updateQuery = 'UPDATE creators SET ' + Object.keys(updatedData).map(key => `${key} = ?`).join(', ') + ' WHERE id_creator = ?';
        const values = [...Object.values(updatedData), id];
    
        db.run(updateQuery, values, function (err) {
          if (err) {
            console.log("Update query error: "+err)
            callback(err, null);
          } else {
            callback(null, { message: 'Creator updated successfully' });
          }
        });
      }
    
      static deleteCreator(id, callback) {
        db.run('DELETE FROM creators WHERE id_creator = ?', [id], (err) => {
          if (err) {
            console.log("Delete query error: "+err)
            callback(err, null);
          } else {
            callback(null, { message: 'Creator deleted successfully' });
          }
        });
      }
}

module.exports = Creator;
