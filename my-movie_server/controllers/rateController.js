const Rate = require('../models/rateModel');


class RateController {
  static getAllRates(req, res) {
    Rate.getAll((err, result) => {
      if (err) {
        res.status(500).json({ error: 'Server error' });
      } else {
        res.json(result);
      }
    });
  }

  static getRateById(req, res) {
    const idRate = req.params.id;

    Rate.getById(idRate, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Server error' });
      } else {
        res.json(result[0]);
      }
    });
  }

  static getRatesByMovie(req, res) {
    const idMovie = req.params.idMovie;

    Rate.getByMovie(idMovie, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Server error' });
      } else {
        res.json(result);
      }
    });
  }


  static getRatesByUser(req, res) {
    const idUser = req.params.idUser;

    Rate.getByUser(idUser, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Server error' });
      } else {
        res.json(result);
      }
    });
  }

  static getRatesCountByUser(req, res) {
    const idUser = req.params.idUser;

    Rate.getCountByUser(idUser, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Server error' });
      } else {
        res.json(result[0]);
      }
    });
  }

  // TODO: date format validation
  static addRate(req, res) {
    const {user_id, movie_id, rate_type, rate_value, rate_date} = req.body;
    console.log(req.body)
    if (!movie_id || !user_id || !rate_type || !rate_value || !rate_date) {
      res.status(400).json({ error: 'Invalid input data' });
      return;
    }

    const rateData = {user_id, movie_id, rate_type, rate_value, rate_date};


    Rate.addRate(rateData, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Server error' });
      } else {
        res.json(result);
      }
    });
  }

  static updateRate(req, res) {
    const idRate = req.params.id;
    const {user_id, movie_id, rate_type, rate_value, rate_date} = req.body;

    if (!movie_id && !user_id && !rate_type && !rate_value && !rate_date) {
      res.status(400).json({ error: 'Invalid input data' });
      return;
    }

    Rate.getById(idRate, (err, rate) => {
      if (err) {
        res.status(500).json({ error: 'Server error' });
      } else {
        if (!rate) {
          res.status(404).json({ error: 'Rate not found' });
        } else {
          const updatedData = {}
          
          if (user_id !== undefined) {
            updatedData.user_id = user_id;
          }

          if (movie_id !== undefined) {
            updatedData.movie_id = movie_id;
          }

          if (rate_type !== undefined) {
            updatedData.rate_type = rate_type;
          }

          if (rate_value !== undefined) {
            updatedData.rate_value = rate_value;
          }

          if (rate_date !== undefined) {
            updatedData.rate_date = rate_date;
          }

          Rate.updateRate(idRate, updatedData, (err, result) => {
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

  static deleteRate(req, res) {
    const idRate = req.params.id;

    Rate.deleteRate(idRate, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Server error' });
      } else {
        res.json(result);
      }
    });
  }
}

module.exports = RateController;
