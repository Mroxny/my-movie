const sqlite3 = require('sqlite3').verbose();
const dbPath = './data.db';
const db = new sqlite3.Database(dbPath);

function isTableEmpty(tableName) {
  return new Promise((resolve, reject) => {
    db.get(`SELECT COUNT(*) as count FROM ${tableName}`, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row.count === 0);
      }
    });
  });
}

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users 
  (id_user INTEGER PRIMARY KEY AUTOINCREMENT, 
    room_id INTEGER,
    username TEXT NOT NULL, 
    password TEXT NOT NULL, 
    email TEXT, 
    img TEXT, 
    isAdmin INTEGER DEFAULT 0,
    FOREIGN KEY(room_id) REFERENCES rooms(id_room))`);

  db.run(`CREATE TABLE IF NOT EXISTS rooms 
  (id_room INTEGER PRIMARY KEY AUTOINCREMENT, 
    room_name TEXT, 
    img TEXT)`);

  db.run(`CREATE TABLE IF NOT EXISTS rates 
  (id_rate INTEGER PRIMARY KEY AUTOINCREMENT, 
    user_id INTEGER, 
    entity_type INTEGER, 
    entity_id INTEGER,
    rate_value INTEGER,
    rate_date TEXT, 
    FOREIGN KEY(user_id) REFERENCES users(id_user))`);

  db.run(`CREATE TABLE IF NOT EXISTS lists 
  (id_list INTEGER PRIMARY KEY AUTOINCREMENT, 
    room_id INTEGER, 
    name TEXT,
    FOREIGN KEY(room_id) REFERENCES rooms(id_room))`);

  db.run(`CREATE TABLE IF NOT EXISTS entityInList 
  (id_entity_in_list INTEGER PRIMARY KEY AUTOINCREMENT, 
    list_id INTEGER, 
    entity_type INTEGER, 
    entity_id INTEGER,
    FOREIGN KEY(list_id) REFERENCES lists(id_list))`);
});

// Insert initial user data
isTableEmpty('users')
  .then((isEmpty) => {
    if (isEmpty) {
      const initialUserData = [
        { username: 'admin', password: "$2b$10$swD4Tbzlo0UkZFGJOYK7y.Ft72TYNW5Q7hnzB5ndgFL.7eMAogy/i", room_id: 1, isAdmin: 1 }
      ];
      const insertUser = db.prepare('INSERT INTO users (room_id, username, password, isAdmin) VALUES (?, ?, ?, ?)');

      initialUserData.forEach((user) => {
        insertUser.run(user.room_id, user.username, user.password, user.isAdmin);
      });

      insertUser.finalize();
      console.log('Inserted initial user data');
    }
  })
  .catch((err) => {
    console.error('Error:', err);
    db.close();
  });

// Insert initial room data
isTableEmpty('rooms')
  .then((isEmpty) => {
    if (isEmpty) {
      const initialRoomData = [
        { room_name: "admin's room", img: "" },
      ];
      const insertRoom = db.prepare('INSERT INTO rooms (room_name, img) VALUES (?, ?)');

      initialRoomData.forEach((room) => {
        insertRoom.run(room.room_name, room.img);
      });

      insertRoom.finalize();
      console.log('Inserted initial room data');
    }
  })
  .catch((err) => {
    console.error('Error:', err);
    db.close();
  });

// Insert initial rate data
isTableEmpty('rates')
  .then((isEmpty) => {
    if (isEmpty) {
      const initialRateData = [
        { user_id: 1, entity_type: 0, entity_id: 1, rate_value: 5, rate_date: "2001-01-01 10:11:12" },
        { user_id: 1, entity_type: 0, entity_id: 2, rate_value: 4, rate_date: "2001-01-01 10:12:12" },
        { user_id: 1, entity_type: 0, entity_id: 3, rate_value: 5, rate_date: "2001-01-01 10:13:12" }
      ];
      const insertRate = db.prepare('INSERT INTO rates (user_id, entity_type, entity_id, rate_value, rate_date) VALUES (?, ?, ?, ?, ?)');

      initialRateData.forEach((rate) => {
        insertRate.run(rate.user_id, rate.entity_type, rate.entity_id, rate.rate_value, rate.rate_date);
      });

      insertRate.finalize();
      console.log('Inserted initial rate data');
    }
  })
  .catch((err) => {
    console.error('Error:', err);
    db.close();
  });

// Insert initial lists data
isTableEmpty('lists')
  .then((isEmpty) => {
    if (isEmpty) {
      const initialListData = [
        { room_id: 1, name: "Favourites" }
      ];
      const insertListType = db.prepare('INSERT INTO lists (room_id, name) VALUES (?, ?)');

      initialListData.forEach((list) => {
        insertListType.run(list.room_id, list.name);
      });

      insertListType.finalize();
      console.log('Inserted initial lists data');
    }
  })
  .catch((err) => {
    console.error('Error:', err);
    db.close();
  });

// Insert initial entity in list data
isTableEmpty('entityInList')
  .then((isEmpty) => {
    if (isEmpty) {
      const initialEntityInListData = [
        { list_id: 1, entity_type: 0, entity_id: 1 },
        { list_id: 1, entity_type: 0, entity_id: 2 },
        { list_id: 1, entity_type: 0, entity_id: 3 }
      ];
      const insertEntityInList = db.prepare('INSERT INTO entityInList (list_id, entity_type, entity_id) VALUES (?, ?, ?)');

      initialEntityInListData.forEach((e) => {
        insertEntityInList.run(e.list_id, e.entity_type, e.entity_id);
      });

      insertEntityInList.finalize();
      console.log('Inserted initial entity in list data');
    }
  })
  .then(() => {
    console.log('Database setup complete');
    db.close();
  })
  .catch((err) => {
    console.error('Error:', err);
    db.close();
  });

