const { json } = require("express");

const Controller = require("./controller");
const User = require("../models/userModel");


class UserController extends Controller{
    // static JWT_SECRET = process.env.JWT_SECRET;
    // static maxQueryLimit = process.env.MAX_QUERY_RESULTS || 50;

    static getUserToken(req, res) {
        const { username, password } = req.body;

        console.log("username: " + username);
        if (!username || !password) {
            res.status(400).json({ error: "Invalid input data" });
            return;
        }

        const jwt = require("jsonwebtoken");
        const bcrypt = require("bcrypt");
        require("dotenv").config();

        User.getByUsername(username, async (err, user) => {
            if (err) {
                res.status(500).json({ error: "Server error" });
            } else {
                if (user[0] === undefined) {
                    res.status(404).json({ error: `No user with username '${username}' found` });
                } else {
                    var u = user[0];
                    const passwordMatch = await bcrypt.compare(password, u.password);
                    if (passwordMatch) {
                        const token = jwt.sign(
                            { id_user: u.id_user, username: u.username, room_id: u.room_id },
                            super.JWT_SECRET,
                            { expiresIn: "1h" }
                        );

                        res.status(200).json({ token });
                    } else {
                        res.status(401).json({ error: "Invalid login details" });
                    }
                }
            }
        });
    }

    static getAllUsers(req, res) {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;

        if (limit > super.maxQueryLimit) {
            res.status(400).json({ error: `Invalid page limit: ${limit}. Max is ${super.maxQueryLimit}` });
            return;
        }

        const offset = (page - 1) * limit;
        const table = "users";
        const condition = "1 = ?";
        const value = 1;

        super.getCountInTable(table, condition, value,(err, totalCount) => {
            if (err) {
                res.status(500).json({ error: "Server error" });
            } else {
                const totalPages = Math.ceil(totalCount / limit);
                User.getAll(limit, offset, (err, result) => {
                    if (err) {
                        res.status(500).json({ error: "Server error" });
                    } else {
                        res.json({
                            users: result,
                            total_results: totalCount,
                            total_pages: totalPages,
                        });
                    }
                });
            }
        });
    }

    static getUserById(req, res) {
        const idUser = req.params.id;

        User.getById(idUser, (err, result) => {
            if (err) {
                res.status(500).json({ error: "Server error" });
            } else {
                res.json(result[0]);
            }
        });
    }

    static getUserByUsername(req, res) {
        const username = req.params.username;

        console.log("username: " + username);

        User.getByUsername(username, (err, result) => {
            if (err) {
                res.status(500).json({ error: "Server error" });
            } else {
                res.json(result[0]);
            }
        });
    }

    static addUser(req, res) {
        const { username, password } = req.body;

        console.log(req.body);
        if (!username || !password) {
            res.status(400).json({ error: "Invalid input data" });
            return;
        }

        const userData = { username, password };

        User.getByUsername(username, (err, user) => {
            if (err) {
                res.status(500).json({ error: `Server error. Couldn't validate username` });
            } else {
                if (user[0] !== undefined) {
                    res.status(409).json({ error: `User username '${username}' already exists` });
                } else {
                    User.addRoom(username, (err, room) => {
                        if (err) {
                            res.status(500).json({ error: `Server error. Couldn't create new room` });
                        } else {
                            if (room === undefined) {
                                res.status(500).json({ error: `Server error. Error while creating new room` });
                            } else {
                                userData.room_id = room.id_room;
                                User.addUser(userData, (err, result) => {
                                    if (err) {
                                        res.status(500).json({ error: `Server error. Couldn't create new user` });
                                    } else {
                                        res.status(201).json(result);
                                    }
                                });
                            }
                        }
                    });
                }
            }
        });
    }

    static updateUser(req, res) {
        const idUser = req.params.id;
        const { username, password, email, img } = req.body;

        if (!username && !password && !email && !img) {
            res.status(400).json({ error: "Invalid input data" });
            return;
        }

        User.getById(idUser, (err, user) => {
            if (err) {
                res.status(500).json({ error: "Server error" });
            } else {
                if (!user) {
                    res.status(404).json({ error: "User not found" });
                } else {
                    const updatedData = {};

                    if (username !== undefined) {
                        updatedData.username = username;
                    }

                    if (password !== undefined) {
                        updatedData.password = password;
                    }

                    if (email !== undefined) {
                        updatedData.email = email;
                    }

                    if (img !== undefined) {
                        updatedData.img = img;
                    }

                    User.updateUser(idUser, updatedData, (err, result) => {
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

    static deleteUser(req, res) {
        const idUser = req.params.id;

        User.deleteUser(idUser, (err, result) => {
            if (err) {
                res.status(500).json({ error: "Server error" });
            } else {
                res.status(200).json(result);
            }
        });
    }
}

module.exports = UserController;
