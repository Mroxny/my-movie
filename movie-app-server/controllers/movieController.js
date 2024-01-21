const Movie = require('../models/movieModel');


class MovieController {
  static getAllMovies(req, res) {
    Movie.getAll((err, result) => {
      if (err) {
        res.status(500).json({ error: 'Server error' });
      } else {
        res.json(result);
      }
    });
  }

  static getMovieById(req, res) {
    const idMovie = req.params.id;

    Movie.getById(idMovie, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Server error' });
      } else {
        res.json(result);
      }
    });
  }

  static addMovie(req, res) {
    const { title, release, img } = req.body;

    console.log(req.body)
    if (!title || !release) {
      res.status(400).json({ error: 'Invalid input data' });
      return;
    }

    const movieData = { title, release };
    if (img) {
      movieData.img = img;
    }

    Movie.addMovie(movieData, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Server error' });
      } else {
        res.json({ message: 'Movie added successfully', id: result.id });
      }
    });
  }

  static updateMovie(req, res) {
    const idMovie = req.params.id;
    const { title, release, img } = req.body;

    if (!title && !release && !img) {
      res.status(400).json({ error: 'Invalid input data' });
      return;
    }

    Movie.getById(idMovie, (err, movie) => {
      if (err) {
        res.status(500).json({ error: 'Server error' });
      } else {
        if (!movie) {
          res.status(404).json({ error: 'Movie not found' });
        } else {
          const updatedData = {}

          if (title !== undefined) {
            updatedData.title = title;
          }

          if (release !== undefined) {
            updatedData.release = release;
          }

          if (img !== undefined) {
            updatedData.img = img;
          }

          Movie.updateMovie(idMovie, updatedData, (err, result) => {
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

  static deleteMovie(req, res) {
    const idMovie = req.params.id;

    Movie.deleteMovie(idMovie, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Server error' });
      } else {
        res.json(result);
      }
    });
  }

}

module.exports = MovieController;
