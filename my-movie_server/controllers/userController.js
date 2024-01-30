const User = require('../models/userModel');


class UserController {

  static getUserToken(req, res) {
    const { email, password } = req.body;

    console.log("email: "+email)
    if (!email || !password) {
      res.status(400).json({ error: 'Invalid input data' });
      return;
    }

    const jwt = require('jsonwebtoken');
    const bcrypt = require('bcrypt');
    require('dotenv').config();

    const JWT_SECRET = process.env.JWT_SECRET;

    User.getByEmail(email, async (err, user) => {
      if (err) {
        res.status(500).json({ error: 'Server error' });
      } else {
        if(user[0] === undefined){
          res.status(404).json({ error: `No user with email '${email}' found` });
        } else {
          var u = user[0]
          const passwordMatch = await bcrypt.compare(password, u.password);
          if (passwordMatch) {
            const token = jwt.sign({ id_user: u.id_user, email: u.email, isAdmin: u.isAdmin }, JWT_SECRET, { expiresIn: '1h' });
        
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
        res.json(result);
      }
    });
  }

  static getUserByEmail(req, res) {
    const userEmail = req.params.email;

    console.log("email: "+userEmail)

    User.getByEmail(userEmail, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Server error' });
      } else {
        res.json(result);
      }
    });
  }

  static addUser(req, res) {
    const { email, password, img } = req.body;

    console.log(req.body)
    if (!email || !password) {
      res.status(400).json({ error: 'Invalid input data' });
      return;
    }

    const userData = { email, password };
    if (img) {
      userData.img = img;
    }

    User.getByEmail(email, (err, user) => {
      if (err) {
        res.status(500).json({ error: 'Server error' });
      } else {
        if (user[0] !== undefined) {
          res.status(409).json({ error: `User email '${email}'already exists` });
        } else {
          User.addUser(userData, (err, result) => {
            if (err) {
              res.status(500).json({ error: 'Server error' });
            } else {
              res.status(201).json({ message: 'User added successfully', id: result.id });
            }
          });
        }

      }
    });


  }

  static updateUser(req, res) {
    const idUser = req.params.id;
    const { email, password, img } = req.body;

    if (!email && !password && !img) {
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

          if (email !== undefined) {
            updatedData.email = email;
          }

          if (password !== undefined) {
            updatedData.password = password;
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
        res.status(410).json(result);
      }
    });
  }

 
}

module.exports = UserController;
