const sqlite3 = require('sqlite3').verbose();
const dbPath = './data.db';
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users 
  (id_user INTEGER PRIMARY KEY AUTOINCREMENT, 
    username TEXT NOT NULL, 
    password TEXT NOT NULL, 
    email TEXT, 
    img TEXT, 
    room_id INTEGER,
    isAdmin INTEGER DEFAULT 0)`);

  db.run(`CREATE TABLE IF NOT EXISTS rooms 
  (id_room INTEGER PRIMARY KEY AUTOINCREMENT, 
    room_name TEXT, 
    img TEXT)`);

  db.run(`CREATE TABLE IF NOT EXISTS rates 
  (id_rate INTEGER PRIMARY KEY AUTOINCREMENT, 
    user_id INTEGER, 
    movie_id INTEGER, 
    rate_type INTEGER, 
    rate_value INTEGER,
    rate_date TEXT, 
    FOREIGN KEY(rate_type) REFERENCES rate_types(id_rate_type), 
    FOREIGN KEY(user_id) REFERENCES users(id_user))`);

  db.run(`CREATE TABLE IF NOT EXISTS rate_types 
  (id_rate_type INTEGER PRIMARY KEY AUTOINCREMENT, 
    rate_name TEXT, 
    icon TEXT)`);

  const initialRoomData = [
    { room_name: "admin's room", img: "" },
  ];

  const initialUserData = [
    { username: 'admin', password: "$2b$10$swD4Tbzlo0UkZFGJOYK7y.Ft72TYNW5Q7hnzB5ndgFL.7eMAogy/i", room_id: 1, isAdmin: 1 }
  ];

  const initialRateData = [
    { user_id: 1, movie_id: 1, rate_type: 1, rate_value: 5 , rate_date: "2001-01-01 10:11:12" },
    { user_id: 1, movie_id: 1, rate_type: 2, rate_value: 4 , rate_date: "2001-01-01 10:11:12" },
    { user_id: 1, movie_id: 1, rate_type: 3, rate_value: 5 , rate_date: "2001-01-01 10:11:12" }
  ];

  const initialRateTypeData = [
    { rate_name: 'main', icon: "" },
    { rate_name: 'pictures', icon: "" },
    { rate_name: 'acting', icon: "" }
  ];

  const insertRoom = db.prepare('INSERT INTO rooms (room_name, img) VALUES (?, ?)');
  const insertUser = db.prepare('INSERT INTO users (username, password, room_id, isAdmin) VALUES (?, ?, ?, ?)');
  const insertRate = db.prepare('INSERT INTO rates (user_id, movie_id, rate_type, rate_value, rate_value) VALUES (?, ?, ?, ?, ?)');
  const insertRateType = db.prepare('INSERT INTO rate_types (rate_name, icon) VALUES (?, ?)');

  initialRoomData.forEach((room) => {
    insertRoom.run(room.room_name, room.img);
  });
  insertRoom.finalize();

  initialUserData.forEach((user) => {
    insertUser.run(user.username, user.password, user.isAdmin);
  });
  insertUser.finalize();

  initialRateData.forEach((rate) => {
    insertRate.run(rate.user_id, rate.movie_id, rate.rate_type, rate.rate_value, rate.rate_date);
  });
  insertRate.finalize();

  initialRateTypeData.forEach((rate_type) => {
    insertRateType.run(rate_type.rate_name, rate_type.icon);
  });
  insertRateType.finalize();

  console.log('Created database');
});

db.close();
