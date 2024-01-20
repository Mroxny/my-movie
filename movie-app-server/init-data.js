const sqlite3 = require('sqlite3').verbose();
const dbPath = './data/movies.db';
const db = new sqlite3.Database(dbPath);

db.serialize(() => {

  const initialMovieData = [
    { title: 'Movie 1', release: 2001 },
    { title: 'Movie 2', release: 2002 },
    { title: 'Movie 3', release: 2003 },
    { title: 'Movie 4', release: 2004 }
  ];

  const initialUserData = [
    { email: 'user_1', password: "123" },
    { email: 'user_2', password: "123" },
    { email: 'user_3', password: "123" },
    { email: 'user_4', password: "123" }
  ];

  const initialRateData = [
    { movie_id: 1, user_id: 1, r_p: 10, r_ac: 10, r_s: 10, r_au: 10, r_all: 10 },
    { movie_id: 1, user_id: 1, r_p: 10, r_ac: 10, r_s: 10, r_au: 10, r_all: 10 },
    { movie_id: 1, user_id: 1, r_p: 10, r_ac: 10, r_s: 10, r_au: 10, r_all: 10 },
    { movie_id: 1, user_id: 1, r_p: 10, r_ac: 10, r_s: 10, r_au: 10, r_all: 10 },
    { movie_id: 1, user_id: 1, r_p: 10, r_ac: 10, r_s: 10, r_au: 10, r_all: 10 },
    { movie_id: 1, user_id: 1, r_p: 10, r_ac: 10, r_s: 10, r_au: 10, r_all: 10 },
    { movie_id: 1, user_id: 1, r_p: 10, r_ac: 10, r_s: 10, r_au: 10, r_all: 10 },
    { movie_id: 1, user_id: 1, r_p: 10, r_ac: 10, r_s: 10, r_au: 10, r_all: 10 }
  ];

  const initialPersonData = [
    { name: 'person_1', surname: "123_1", birth_dat: "2001-01-01" },
    { name: 'person_2', surname: "123_2", birth_dat: "2002-02-02" },
    { name: 'person_3', surname: "123_3", birth_dat: "2003-03-03" },
    { name: 'person_4', surname: "123_4", birth_dat: "2004-04-04" }
  ];

  const initialCreatorData = [
    { movie_id: 1, person_id: 1, role: 1 },
    { movie_id: 1, person_id: 2, role: 2 },
    { movie_id: 1, person_id: 3, role: 3 },
    { movie_id: 1, person_id: 4, role: 4 },
    { movie_id: 2, person_id: 2, role: 1 },
    { movie_id: 2, person_id: 1, role: 2 },
    { movie_id: 2, person_id: 4, role: 3 },
    { movie_id: 2, person_id: 3, role: 4 },
    { movie_id: 3, person_id: 1, role: 1 },
    { movie_id: 3, person_id: 3, role: 2 },
    { movie_id: 3, person_id: 2, role: 3 },
    { movie_id: 3, person_id: 4, role: 4 },
    { movie_id: 4, person_id: 4, role: 1 },
    { movie_id: 4, person_id: 3, role: 2 },
    { movie_id: 4, person_id: 2, role: 3 },
    { movie_id: 4, person_id: 1, role: 4 }
  ];

  const insertMovie = db.prepare('INSERT INTO movies (title, release) VALUES (?, ?)');
  const insertUser = db.prepare('INSERT INTO users (email, password) VALUES (?, ?)');
  const insertRate = db.prepare('INSERT INTO rates (movie_id, user_id, r_p, r_ac, r_s, r_au, r_all) VALUES (?, ?, ?, ?, ?, ?, ?)');
  const insertPerson = db.prepare('INSERT INTO persons (name, surname, birth_date) VALUES (?, ?, ?)');
  const insertCreator = db.prepare('INSERT INTO creators (movie_id, person_id, role) VALUES (?, ?, ?)');

  initialMovieData.forEach((movie) => {
    insertMovie.run(movie.title, movie.release);
  });
  insertMovie.finalize();

  initialUserData.forEach((user) => {
    insertUser.run(user.email, user.password);
  });
  insertUser.finalize();

  initialRateData.forEach((rate) => {
    insertRate.run(rate.movie_id, rate.user_id, rate.r_p, rate.r_ac, rate.r_s, rate.r_au, rate.r_all);
  });
  insertRate.finalize();

  initialPersonData.forEach((person) => {
    insertPerson.run(person.name, person.surname, person.birth_dat);
  });
  insertPerson.finalize();

  initialCreatorData.forEach((creator) => {
    insertCreator.run(creator.movie_id, creator.person_id, creator.role);
  });
  insertCreator.finalize();

});

db.close();
console.log('Database initialized');
