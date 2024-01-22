const User = require('../models/userModel');
const { use } = require('../routes');


class UserController {

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

    User.addUser(userData, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Server error' });
      } else {
        res.json({ message: 'User added successfully', id: result.id });
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
              res.json(result);
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
        res.json(result);
      }
    });
  }

 
}

module.exports = UserController;
