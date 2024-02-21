const Rate = require("../models/rateModel");

class RateController {
    static getAllRatesOld(req, res) {
        Rate.getAll((err, result) => {
            if (err) {
                res.status(500).json({ error: "Server error" });
            } else {
                res.json(result);
            }
        });
    }

    static getAllRates(req, res) {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const maxLimit = 50;

        if (limit > maxLimit) {
            res.status(400).json({ error: `Invalid page limit: ${limit}. Max is ${maxLimit}` });
            return;
        }

        const offset = (page - 1) * limit;
        const condition = "1= ?";
        const value = 1;
        Rate.getRateCount(condition, value, (err, totalCount) => {
            if (err) {
                res.status(500).json({ error: "Server error" });
            } else {
                const totalPages = Math.ceil(totalCount / limit);
                Rate.getAll(limit, offset, (err, result) => {
                    if (err) {
                        res.status(500).json({ error: "Server error" });
                    } else {
                        res.json({
                            rates: result,
                            total_results: totalCount,
                            total_pages: totalPages,
                        });
                    }
                });
            }
        });
    }

    static getRateById(req, res) {
        const idRate = req.params.id;

        Rate.getById(idRate, (err, result) => {
            if (err) {
                res.status(500).json({ error: "Server error" });
            } else {
                res.json(result[0]);
            }
        });
    }

    static getRatesByMovie(req, res) {
        const idMovie = req.params.idMovie;

        Rate.getByMovie(idMovie, (err, result) => {
            if (err) {
                res.status(500).json({ error: "Server error" });
            } else {
                res.json(result);
            }
        });
    }

    static getRatesByUser(req, res) {
        const idUser = req.params.idUser;

        Rate.getByUser(idUser, (err, result) => {
            if (err) {
                res.status(500).json({ error: "Server error" });
            } else {
                res.json(result);
            }
        });
    }

    static getRatesCountByUser(req, res) {
        const idUser = req.params.idUser;

        Rate.getCountByUser(idUser, (err, result) => {
            if (err) {
                res.status(500).json({ error: "Server error" });
            } else {
                res.json(result[0]);
            }
        });
    }

    static addRate(req, res) {
        const { user_id, entity_type, entity_id, rate_value, rate_date } = req.body;
        console.log("Adding rate body:" + JSON.stringify(req.body));

        if (!user_id || !entity_type || !entity_id || !rate_value || !rate_date) {
            res.status(400).json({ error: "Invalid input data" });
            return;
        }

        const dateFormatRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
        if (!dateFormatRegex.test(rate_date)) {
            res.status(400).json({
                error: "Invalid date format. Please provide the date in the format: YYYY-MM-DD HH:mm:ss",
            });
            return;
        }

        const rateData = {
            user_id,
            entity_type,
            entity_id,
            rate_value,
            rate_date,
        };

        Rate.addRate(rateData, (err, result) => {
            if (err) {
                res.status(500).json({ error: "Server error" });
            } else {
                res.status(201).json(result);
            }
        });
    }

    static updateRate(req, res) {
        const idRate = req.params.id;
        const { user_id, entity_type, entity_id, rate_value, rate_date } = req.body;
        console.log("Updating rate body:" + JSON.stringify(req.body));

        if (!entity_type && !user_id && !entity_id && !rate_value && !rate_date) {
            res.status(400).json({ error: "Invalid input data" });
            return;
        }

        Rate.getById(idRate, (err, rate) => {
            if (err) {
                res.status(500).json({ error: "Server error" });
            } else {
                if (!rate) {
                    res.status(404).json({ error: "Rate not found" });
                } else {
                    const updatedData = {};

                    if (user_id !== undefined) {
                        updatedData.user_id = user_id;
                    }

                    if (entity_type !== undefined) {
                        updatedData.entity_type = entity_type;
                    }

                    if (entity_id !== undefined) {
                        updatedData.entity_id = entity_id;
                    }

                    if (rate_value !== undefined) {
                        updatedData.rate_value = rate_value;
                    }

                    if (rate_date !== undefined) {
                        updatedData.rate_date = rate_date;
                    }

                    Rate.updateRate(idRate, updatedData, (err, result) => {
                        if (err) {
                            res.status(500).json({ error: "Server error" });
                        } else {
                            res.status(200).json(result);
                        }
                    });
                }
            }
        });
    }

    static deleteRate(req, res) {
        const idRate = req.params.id;

        Rate.deleteRate(idRate, (err, result) => {
            if (err) {
                res.status(500).json({ error: "Server error" });
            } else {
                res.status(200).json(result);
            }
        });
    }
}

module.exports = RateController;
