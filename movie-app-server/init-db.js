const sqlite3 = require('sqlite3').verbose();
const dbPath = './data/movies.db';
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS movies (id_movie INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, release TEXT NOT NULL, img TEXT approved INTEGER DEFAULT 0)');
  db.run('CREATE TABLE IF NOT EXISTS users (id_user INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT NOT NULL, password TEXT NOT NULL, img TEXT)');
  db.run('CREATE TABLE IF NOT EXISTS rates (id_rate INTEGER PRIMARY KEY AUTOINCREMENT, movie_id INTEGER, user_id INTEGER, r_p INTEGER, r_ac INTEGER, r_s INTEGER, r_au INTEGER, r_all INTEGER)');
  db.run('CREATE TABLE IF NOT EXISTS persons (id_person INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, surname TEXT, birth_date TEXT)');
  db.run('CREATE TABLE IF NOT EXISTS creators (id_creator INTEGER PRIMARY KEY AUTOINCREMENT, movie_id INTEGER, person_id INTEGER, role INTEGER)');

console.log('Created database');
});

db.close();
