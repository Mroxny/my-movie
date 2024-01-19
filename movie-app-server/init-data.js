const sqlite3 = require('sqlite3').verbose();
const dbPath = './data/movies.db';
const db = new sqlite3.Database(dbPath);

db.serialize(() => {

  const initialData = [
    { title: 'Movie 1', release: 2001 },
    { title: 'Movie 2', release: 2002 },
    { title: 'Movie 3', release: 2003 }
  ];

  const insertStmt = db.prepare('INSERT INTO movies (title, release) VALUES (?, ?)');

  initialData.forEach((movie) => {
    insertStmt.run(movie.title, movie.release);
  });

  insertStmt.finalize();

  console.log('Database initialized');
});

db.close();
