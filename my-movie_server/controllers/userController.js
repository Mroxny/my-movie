const User = require('../models/userModel');


class UserController {

  static getUserToken(req, res) {
    const { username, password } = req.body;

    console.log("username: "+username)
    if (!username || !password) {
      res.status(400).json({ error: 'Invalid input data' });
      return;
    }

    const jwt = require('jsonwebtoken');
    const bcrypt = require('bcrypt');
    require('dotenv').config();

    const JWT_SECRET = process.env.JWT_SECRET;

    User.getByUsername(username, async (err, user) => {
      if (err) {
        res.status(500).json({ error: 'Server error' });
      } else {
        if(user[0] === undefined){
          res.status(404).json({ error: `No user with username '${username}' found` });
        } else {
          var u = user[0]
          const passwordMatch = await bcrypt.compare(password, u.password);
          if (passwordMatch) {
            const token = jwt.sign({ id_user: u.id_user, username: u.username, isAdmin: u.isAdmin }, JWT_SECRET, { expiresIn: '1h' });
        
            res.status(200).json({ token });
          } else {
            res.status(401).json({ error: 'Nieprawidłowe dane logowania' });
          }
        }

      }
    });
  }
  
  static getAllUsers(req, res) {
    User.getAll((err, result) => {
      if (err) {
        res.status(500).json({ error: 'Server error' });
      } else {
        res.json(result);
      }
    });
  }

  static getUserById(req, res) {
    const idUser = req.params.id;

    User.getById(idUser, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Server error' });
      } else {
        res.json(result[0]);
      }
    });
  }

  static getUserByUsername(req, res) {
    const username = req.params.username;

    console.log("username: "+username)

    User.getByUsername(username, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Server error' });
      } else {
        res.json(result[0]);
      }
    });
  }

  static addUser(req, res) {
    const { username, password } = req.body;

    console.log(req.body)
    if (!username || !password) {
      res.status(400).json({ error: 'Invalid input data' });
      return;
    }

    const userData = { username, password };

    User.getByUsername(username, (err, user) => {
      if (err) {
        res.status(500).json({ error: 'Server error' });
      } else {
        if (user[0] !== undefined) {
          res.status(409).json({ error: `User username '${username}' already exists` });
        } else {
          User.addUser(userData, (err, result) => {
            if (err) {
              res.status(500).json({ error: 'Server error' });
            } else {
              res.status(201).json(result);
            }
          });
        }
      }
    });
  }

  static updateUser(req, res) {
    const idUser = req.params.id;
    const { username, password, email, img } = req.body;

    if (!username && !password && !email && !img) {
      res.status(400).json({ error: 'Invalid input data' });
      return;
    }

    User.getById(idUser, (err, user) => {
      if (err) {
        res.status(500).json({ error: 'Server error' });
      } else {
        if (!user) {
          res.status(404).json({ error: 'User not found' });
        } else {
          const updatedData = {}

          if (username !== undefined) {
            updatedData.username = username;
          }

          if (password !== undefined) {
            updatedData.password = password;
          }

          if (email !== undefined) {
            updatedData.email = email;
          }

          if (img !== undefined) {
            updatedData.img = img;
          }

          User.updateUser(idUser, updatedData, (err, result) => {
            if (err) {
              res.status(500).json({ error: 'Server error' });
            } else {
              res.status(200).json(result);
            }
          });
        }
      }
    });
  }

  static deleteUser(req, res) {
    const idUser = req.params.id;

    User.deleteUser(idUser, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Server error' });
      } else {
        res.status(200).json(result);
      }
    });
  }

 
}

module.exports = UserController;
