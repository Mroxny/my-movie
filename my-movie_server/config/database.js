const sqlite3 = require('sqlite3').verbose();

const dbPath = './data.db';
const db = new sqlite3.Database(dbPath);

module.exports = db;
