const Rate = require('../models/rateModel');

class RateRepository {
  static getAllRates(callback) {
    Rate.getAll(callback);
  }

  static getRateById(id, callback) {
    Rate.getById(id, callback);
  }

  static getRatesByMovie(id, callback) {
    Rate.getByMovie(id, callback);
  }

  static getRatesByUser(id, callback) {
    Rate.getByUser(id, callback);
  }

  static addRate(rateData, callback) {
    Rate.addRate(rateData, callback);
  }

  static updateRate(id, updatedData, callback) {
    Rate.updateRate(id, updatedData, callback);
  }

  static deleteRate(id, callback) {
    Rate.deleteRate(id, callback);
  }
}

module.exports = RateRepository;
