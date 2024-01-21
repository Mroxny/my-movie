const Creator = require('../models/creatorModel');


class CreatorController {
  static getAllCreators(req, res) {
    Creator.getAll((err, result) => {
      if (err) {
        res.status(500).json({ error: 'Server error' });
      } else {
        res.json(result);
      }
    });
  }

  static getCreatorById(req, res) {
    const idCreator = req.params.id;

    Creator.getById(idCreator, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Server error' });
      } else {
        res.json(result);
      }
    });
  }

  static getCreatorsByMovie(req, res) {
    const idMovie = req.params.idMovie;

    Creator.getByMovie(idMovie, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Server error' });
      } else {
        res.json(result);
      }
    });
  }

  static addCreator(req, res) {
    const {movie_id, user_id, r_p, r_ac, r_s, r_au, r_all} = req.body;

    console.log(req.body)
    if (!movie_id || !user_id || !r_p || !r_ac || !r_s || !r_au || !r_all) {
      res.status(400).json({ error: 'Invalid input data' });
      return;
    }

    const rateData = {movie_id, user_id, r_p, r_ac, r_s, r_au, r_all};


    Creator.addCreator(rateData, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Server error' });
      } else {
        res.json({ message: 'Rate added successfully', id: result.id });
      }
    });
  }

  static updateCreator(req, res) {
    const idCreator = req.params.id;
    const {movie_id, person_id, role} = req.body;

    if (!movie_id && !person_id && !role) {
      res.status(400).json({ error: 'Invalid input data' });
      return;
    }

    Creator.getById(idCreator, (err, creator) => {
      if (err) {
        res.status(500).json({ error: 'Server error' });
      } else {
        if (!creator) {
          res.status(404).json({ error: 'Rate not found' });
        } else {
          const updatedData = {}

          if (movie_id !== undefined) {
            updatedData.movie_id = movie_id;
          }

          if (person_id !== undefined) {
            updatedData.person_id = person_id;
          }

          if (role !== undefined) {
            updatedData.role = role;
          }


          Creator.updateCreator(idCreator, updatedData, (err, result) => {
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

  static deleteCreator(req, res) {
    const idCreator = req.params.id;

    Creator.deleteCreator(idCreator, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Server error' });
      } else {
        res.json(result);
      }
    });
  }
}

module.exports = CreatorController;
