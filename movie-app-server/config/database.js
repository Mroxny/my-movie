// database.js

const sqlite3 = require('sqlite3').verbose();

// Ścieżka do pliku bazy danych
const dbPath = './data/movies.db';

const db = new sqlite3.Database(dbPath);

module.exports = db;
