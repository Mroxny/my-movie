const db = require("../config/database");
const bcrypt = require("bcrypt");

class List {
    static getCount(table, condition, value, callback) {
        const query = `SELECT COUNT(*) as total FROM ${table} WHERE ${condition}`;

        db.get(query, value, (err, row) => {
            if (err) {
                console.log("Count query error: " + err);
                callback(err, null);
            } else {
                callback(null, row.total);
            }
        });
    }

    static getAll(limit, offset, callback) {
        db.all("SELECT * FROM lists LIMIT ? OFFSET ?", [limit, offset], (err, result) => {
            if (err) {
                console.log("Select query error: " + err);
                callback(err, null);
            } else {
                console.log("Select query result: " + result);
                callback(null, result);
            }
        });
    }

    static getById(id, callback) {
        const query = `
            SELECT l.*
            FROM lists l
            WHERE l.id_list = ?;`;

        db.all(query, id, (err, result) => {
            if (err) {
                console.log("Select query error: " + err);
                callback(err, null);
            } else {
                console.log("Select query result: " + result);
                callback(null, result);
            }
        });
    }

    static getByRoom(id, limit, offset, callback) {
        const query = `
            SELECT l.*
            FROM lists l
            WHERE l.room_id = ?
            LIMIT ? OFFSET ?`;

        db.all(query, [id, limit, offset], (err, result) => {
            if (err) {
                console.log("Select query error: " + err);
                callback(err, null);
            } else {
                console.log("Select query result: " + result);
                callback(null, result);
            }
        });
    }

    static getEntities(id, limit, offset, callback) {
        const query = `
            SELECT e.*
            FROM entityInList e
            WHERE list_id = ?
            LIMIT ? OFFSET ?`;

        db.all(query, [id, limit, offset], (err, result) => {
            if (err) {
                console.log("Select query error: " + err);
                callback(err, null);
            } else {
                console.log("Select query result: " + result);
                callback(null, result);
            }
        });
    }

    static async addList(userData, callback) {
        const { room_id, name } = userData;

        db.run("INSERT INTO lists (room_id, name) VALUES (?, ?)", [room_id, name], (err) => {
            if (err) {
                console.log("Insert query error: " + err);
                callback(err, null);
            } else {
                db.get("SELECT last_insert_rowid() as id", (err, row) => {
                    if (err) {
                        console.log("Select query error: " + err);
                        callback(err, null);
                    } else {
                        var id_list = row.id;
                        callback(null, { message: "List added successfully", id: id_list });
                    }
                });
            }
        });
    }

    static async addEntityToList(userData, callback) {
        const { list_id, entity_type, entity_id } = userData;

        db.run(
            "INSERT INTO entityInList (list_id, entity_type, entity_id) VALUES (?, ?, ?)",
            [list_id, entity_type, entity_id],
            (err) => {
                if (err) {
                    console.log("Insert query error: " + err);
                    callback(err, null);
                } else {
                    db.get("SELECT last_insert_rowid() as id", (err, row) => {
                        if (err) {
                            console.log("Select query error: " + err);
                            callback(err, null);
                        } else {
                            var id_entity = row.id;
                            callback(null, { message: "Entity added successfully", id: id_entity });
                        }
                    });
                }
            }
        );
    }

    static updateList(id, updatedData, callback) {
        const updateQuery =
            "UPDATE lists SET " +
            Object.keys(updatedData)
                .map((key) => `${key} = ?`)
                .join(", ") +
            " WHERE id_list = ?";
        const values = [...Object.values(updatedData), id];

        db.run(updateQuery, values, function (err) {
            if (err) {
                console.log("Update query error: " + err);
                callback(err, null);
            } else {
                callback(null, { message: "List updated successfully" });
            }
        });
    }

    static deleteList(id, callback) {
        db.run("DELETE FROM lists WHERE id_list = ?", [id], (err) => {
            if (err) {
                console.log("Delete query error: " + err);
                callback(err, null);
            } else {
                callback(null, { message: "List deleted successfully" });
            }
        });
    }

    static deleteEntityFromList(id, callback) {
        db.run("DELETE FROM entityInList WHERE id_entity_in_list = ?", [id], (err) => {
            if (err) {
                console.log("Delete query error: " + err);
                callback(err, null);
            } else {
                callback(null, { message: "Entity deleted successfully" });
            }
        });
    }
}

module.exports = List;
