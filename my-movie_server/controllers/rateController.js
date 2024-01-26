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
        res.json(result);
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

  static addRate(req, res) {
    const {movie_id, user_id, r_p, r_ac, r_s, r_au, r_all} = req.body;

    console.log(req.body)
    if (!movie_id || !user_id || !r_p || !r_ac || !r_s || !r_au || !r_all) {
      res.status(400).json({ error: 'Invalid input data' });
      return;
    }

    const rateData = {movie_id, user_id, r_p, r_ac, r_s, r_au, r_all};


    Rate.addRate(rateData, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Server error' });
      } else {
        res.json({ message: 'Rate added successfully', id: result.id });
      }
    });
  }

  static updateRate(req, res) {
    const idRate = req.params.id;
    const {movie_id, user_id, r_p, r_ac, r_s, r_au, r_all} = req.body;

    if (!movie_id && !user_id && !r_p && !r_ac && !r_s && !r_au && !r_all) {
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

          if (movie_id !== undefined) {
            updatedData.movie_id = movie_id;
          }

          if (user_id !== undefined) {
            updatedData.user_id = user_id;
          }

          if (r_p !== undefined) {
            updatedData.r_p = r_p;
          }

          if (r_ac !== undefined) {
            updatedData.r_ac = r_ac;
          }

          if (r_s !== undefined) {
            updatedData.r_s = r_s;
          }

          if (r_au !== undefined) {
            updatedData.r_au = r_au;
          }
          
          if (r_all !== undefined) {
            updatedData.r_all = r_all;
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
