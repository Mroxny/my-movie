const db = require('../config/database');
const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return {password: hashedPassword};
  } catch (err) {
    console.error('Error while encoding password: '+ err);
    return {error: err};

  }
};

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
    const query = `
    SELECT 
    u.*,
    r.room_name,
    r.room_img 
    FROM users u
    INNER JOIN rooms r ON r.id_room = u.room_id
    WHERE u.id_user = ?;`


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

  static getByUsername(username ,callback) {
    const query = `
    SELECT 
    u.*,
    r.room_name,
    r.room_img 
    FROM users u
    INNER JOIN rooms r ON r.id_room = u.room_id
    WHERE u.username = ?;`

    db.all(query, username, (err, result) => {
      if (err) {
        console.log("Select query error: "+err)
        callback(err, null);
      } else {
        console.log("Select query result: "+result)
        callback(null, result);
      }
    });
  }

  static async addRoom(userName, callback) {
    var insertString = 'INSERT INTO rooms (room_name) VALUES (?)';
    var insertData = [`${userName}'s room`];

    db.run(insertString, insertData, (err) => {
        if (err) {
            console.log("Insert query error: " + err);
            callback(err, null);
        } else {
            db.get('SELECT last_insert_rowid() as id', (err, row) => {
                if (err) {
                    console.log("Select query error: " + err);
                    callback(err, null);
                } else {
                    var id_room = row.id;
                    callback(null, { id_room: id_room });
                }
            });
        }
    });
}

  static async addUser(userData, callback) {
    const {username, password, room_id} = userData
    const hashedPassword = await hashPassword(password)
    
    if(hashedPassword.error){
      console.log(hashedPassword.error)
      callback(hashedPassword)
      return
    }
    
    var insertString = 'INSERT INTO users (username, password, room_id) VALUES (?, ?, ?)'
    var insertData = [username, hashedPassword.password, room_id]

    db.run(insertString, insertData, (err) => {
      if (err) {
        console.log("Insert query error: "+err)
        callback(err, null);
      } else {
        db.get('SELECT last_insert_rowid() as id', (err, row) => {
          if (err) {
              console.log("Select query error: " + err);
              callback(err, null);
          } else {
              var id_user = row.id;
              callback(null, {message: 'User added successfully', id_user: id_user });
          }
        });
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
