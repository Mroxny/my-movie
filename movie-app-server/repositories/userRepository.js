const User = require('../models/userModel');

class UserRepository {
  static getAllUsers(callback) {
    User.getAll(callback);
  }

  static getUserById(id, callback) {
    User.getById(id, callback);
  }

  static addUser(userData, callback) {
    User.addUser(userData, callback);
  }

  static updateUser(id, updatedData, callback) {
    User.updateUser(id, updatedData, callback);
  }

  static deleteUser(id, callback) {
    User.deleteUser(id, callback);
  }
}

module.exports = UserRepository;
