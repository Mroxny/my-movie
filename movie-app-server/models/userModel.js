const db = require('../config/database');

class User {
  static getAll(callback) {
    db.all('SELECT * FROM users', (err, result) => {
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
    console.log(id)
    db.all('SELECT * FROM users WHERE id_user = ?', id, (err, result) => {
      if (err) {
        console.log("Select query error: "+err)
        callback(err, null);
      } else {
        console.log("Select query result: "+result)
        callback(null, result);
      }
    });
  }

  static addUser(userData, callback) {
    const {email, password, img} = userData
    
    var insertString = ''
    var insertData = []
    if(img){
      insertString='INSERT INTO users (email, password, img) VALUES (?, ?, ?)'
      insertData = [email, password, img]
    }
    else{
      insertString='INSERT INTO users (email, password) VALUES (?, ?)'
      insertData = [email, password]
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

  static updateUser(id, updatedData, callback) {
    const updateQuery = 'UPDATE users SET ' + Object.keys(updatedData).map(key => `${key} = ?`).join(', ') + ' WHERE id_user = ?';
    const values = [...Object.values(updatedData), id];

    db.run(updateQuery, values, function (err) {
      if (err) {
        console.log("Update query error: "+err)
        callback(err, null);
      } else {
        callback(null, { message: 'User updated successfully' });
      }
    });
  }

  static deleteUser(id, callback) {
    db.run('DELETE FROM users WHERE id_user = ?', [id], (err) => {
      if (err) {
        console.log("Delete query error: "+err)
        callback(err, null);
      } else {
        callback(null, { message: 'User deleted successfully' });
      }
    });
  }
}

module.exports = User;
