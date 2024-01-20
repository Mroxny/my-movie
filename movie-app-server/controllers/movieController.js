const MovieRepository = require('../repositories/movieRepository');

class MovieController {
  static getAllMovies(req, res) {
    MovieRepository.getAllMovies((err, result) => {
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

    MovieRepository.addMovie(movieData, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Server error' });
      } else {
        res.json({ message: 'Movie added successfully', id: result.id });
      }
    });
  }

  static deleteMovie(req, res) {
    const idMovie = req.params.id;
    console.log(idMovie)

    MovieRepository.deleteMovie(idMovie, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Server error' });
      } else {
        res.json(result);
      }
    });
  }
}

module.exports = MovieController;
