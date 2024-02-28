const db = require("../config/database");
require("dotenv").config();

class Controller {
    static JWT_SECRET = process.env.JWT_SECRET;
    static maxQueryLimit = process.env.MAX_QUERY_RESULTS || 50;

    static getCountInTable(table, condition, value, callback) {
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
}

module.exports = Controller;