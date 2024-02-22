const { query } = require("express");
const db = require("../config/database");

class Rate {
    static getRateCount(condition, value, callback) {
        const query = `SELECT COUNT(*) as total FROM rates WHERE ${condition}`;

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
        db.all(`SELECT * FROM rates LIMIT ? OFFSET ?`, [limit, offset], (err, result) => {
            if (err) {
                console.log("Select query error: " + err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    static getById(id, callback) {
        const query = `SELECT *
      FROM rates 
      WHERE id_rate = ?`;

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

    static getByMovie(id_movie, limit, offset, callback) {
        const query = `
            SELECT
                r.*,
                u.username
            FROM rates r
            JOIN users u ON r.user_id = u.id_user
            WHERE r.entity_type = 1 AND r.entity_id = ?
            LIMIT ? OFFSET ?`;

        db.all(query, [id_movie, limit, offset], (err, result) => {
            if (err) {
                console.log("Select query error: " + err);
                callback(err, null);
            } else {
                console.log("Select query result: " + result);
                callback(null, result);
            }
        });
    }

    static getByUser(id_user, callback) {
        const query = `SELECT *
      FROM rates 
      WHERE user_id = ?`;

        db.all(query, id_user, (err, result) => {
            if (err) {
                console.log("Select query error: " + err);
                callback(err, null);
            } else {
                console.log("Select query result: " + result);
                callback(null, result);
            }
        });
    }
    static getCountByUser(id_user, callback) {
        const query = `SELECT 
      COUNT(DISTINCT entity_id) AS rates
      FROM rates
      WHERE user_id = ?;`;

        db.all(query, id_user, (err, result) => {
            if (err) {
                console.log("Select query error: " + err);
                callback(err, null);
            } else {
                console.log("Select query result: " + result);
                callback(null, result);
            }
        });
    }

    static addRate(rateData, callback) {
        const { user_id, entity_type, entity_id, rate_value, rate_date } = rateData;
        const insertString =
            "INSERT INTO rates (user_id, entity_type, entity_id, rate_value, rate_date) VALUES (?, ?, ?, ?, ?)";

        db.run(insertString, [user_id, entity_type, entity_id, rate_value, rate_date], (err) => {
            if (err) {
                console.log("Insert query error: " + err);
                callback(err, null);
            } else {
                db.get("SELECT last_insert_rowid() as id_rate", (err, row) => {
                    if (err) {
                        console.log("Select query error: " + err);
                        callback(err, null);
                    } else {
                        var id_rate = row.id_rate;
                        callback(null, { message: "Rate added successfully", id_rate: id_rate });
                    }
                });
            }
        });
    }

    static updateRate(id, updatedData, callback) {
        const updateQuery =
            "UPDATE rates SET " +
            Object.keys(updatedData)
                .map((key) => `${key} = ?`)
                .join(", ") +
            " WHERE id_rate = ?";
        const values = [...Object.values(updatedData), id];

        db.run(updateQuery, values, function (err) {
            if (err) {
                console.log("Update query error: " + err);
                callback(err, null);
            } else {
                callback(null, { message: "Rate updated successfully" });
            }
        });
    }

    static deleteRate(id, callback) {
        db.run("DELETE FROM rates WHERE id_rate = ?", [id], (err) => {
            if (err) {
                console.log("Delete query error: " + err);
                callback(err, null);
            } else {
                callback(null, { message: "Rate deleted successfully" });
            }
        });
    }
}

module.exports = Rate;
