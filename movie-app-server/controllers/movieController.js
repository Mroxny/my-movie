const MovieRepository = require('../repositories/movieRepository');
const UserRepository = require('../repositories/userRepository');


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

  static getMovieById(req, res) {
    const idMovie = req.params.id;

    MovieRepository.getMovieById(idMovie, (err, result) => {
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

  static updateMovie(req, res) {
    const idMovie = req.params.id;
    const { title, release, img } = req.body;

    if (!title && !release && !img) {
      res.status(400).json({ error: 'Invalid input data' });
      return;
    }

    MovieRepository.getMovieById(idMovie, (err, movie) => {
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

          MovieRepository.updateMovie(idMovie, updatedData, (err, result) => {
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

    MovieRepository.deleteMovie(idMovie, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Server error' });
      } else {
        res.json(result);
      }
    });
  }

  static getAllUsers(req, res) {
    UserRepository.getAllUsers((err, result) => {
      if (err) {
        res.status(500).json({ error: 'Server error' });
      } else {
        res.json(result);
      }
    });
  }

  static getUserById(req, res) {
    const idUser = req.params.id;

    UserRepository.getUserById(idUser, (err, result) => {
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

    UserRepository.addUser(userData, (err, result) => {
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

    UserRepository.getUserById(idUser, (err, user) => {
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

          UserRepository.updateUser(idUser, updatedData, (err, result) => {
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

    UserRepository.deleteUser(idUser, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Server error' });
      } else {
        res.json(result);
      }
    });
  }
}

module.exports = MovieController;
