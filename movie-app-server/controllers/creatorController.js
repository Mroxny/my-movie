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
    const {movie_id, name, surname, birth_date, role} = req.body;

    console.log(req.body)
    if (!movie_id || !name || !surname || !birth_date || !role) {
      res.status(400).json({ error: 'Invalid input data' });
      return;
    }

    const personData = {name, surname, birth_date};

    Creator.addPerson(personData, (err) => {
        if (err) {
          res.status(500).json({ error: 'Server error' });
        } else{
            Creator.getLastPerson((err, person) => {
                if (err) {
                  res.status(500).json({ error: 'Server error' });
                } else {
                  if (!person) {
                    res.status(404).json({ error: 'Person not added' });
                  } else {
                    const {id_person} = person[0]
                    const creatorData = {movie_id, id_person, role};
                    console.log(creatorData)
                    
                    Creator.addCreator(creatorData, (err, result) => {
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
