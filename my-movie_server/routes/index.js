const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const MovieController = require("../controllers/movieController");
const UserController = require("../controllers/userController");
const RateController = require("../controllers/rateController");
const ListController = require("../controllers/listController");

const User = require("../models/userModel");

require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ error: "Authorization failed, access denied" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: "Token verification error, authorization failed" });
    }
};

const validateAdmin = (req, res, next) => {
    const id_user = req.user.id_user;

    try {
        User.getById(id_user, (err, result) => {
            if (err) {
                res.status(500).json({ error: "Server error. Failed to authorize administrator" });
            } else {
                if (!result[0] || !result[0].isAdmin) {
                    return res.status(403).json({ error: "Unauthorized, user is not an admin" });
                }
                next();
            }
        });
    } catch (error) {
        console.error("Error checking admin status:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const validateUser = (req, res, next) => {
    const user = req.user;

    try {
        User.getById(user.id_user, (err, result) => {
            if (err) {
                res.status(500).json({ error: "Server error. Failed to authorize request" });
            } else {
                if (!result[0] || !result[0].isAdmin || !user.id_user !== req.params.id) {
                    return res.status(403).json({ error: "Unauthorized, user is not an admin" });
                }
                next();
            }
        });
    } catch (error) {
        console.error("Error checking admin status:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// movies
// router.get('/movies', MovieController.getAllMovies);
// router.get('/movies/:id', MovieController.getMovieById);
// router.post('/movies', MovieController.addMovie);
// router.put('/movies/:id', MovieController.updateMovie);
// router.delete('/movies/:id', MovieController.deleteMovie);

// users
router.get("/login", UserController.getUserToken);
router.get("/users", verifyToken, UserController.getAllUsers);
router.get("/users/:id", verifyToken, UserController.getUserById);
router.get("/users/username/:username", verifyToken, UserController.getUserByUsername);
router.post("/users", UserController.addUser);
router.put("/users/:id", verifyToken, validateUser, UserController.updateUser);
router.delete("/users/:id", verifyToken, validateUser, UserController.deleteUser);

// rates
router.get("/rates", RateController.getAllRates);
router.get("/rates/:id", RateController.getRateById);
router.get("/rates/user/:idUser", RateController.getRatesByUser);
router.get("/rates/user/:idUser/count", RateController.getRatesCountByUser);
router.get("/rates/movie/:idMovie", RateController.getRatesByMovie);
router.post("/rates", verifyToken, RateController.addRate);
router.put("/rates/:id", verifyToken, RateController.updateRate);
router.delete("/rates/:id", verifyToken, validateAdmin, RateController.deleteRate);

// lists
router.get("/lists", verifyToken, validateAdmin, ListController.getAllLists);
router.get("/lists/:id", verifyToken, ListController.getListById);
router.get("/lists/room/:roomId", verifyToken, ListController.getListByRoom);
router.get("/lists/:id/entities", verifyToken, ListController.getEntitiesByListId);
router.post("/lists", verifyToken, ListController.addList);
router.post("/lists/:id/entity", verifyToken, ListController.addEntityToList);
router.put("/lists/:id", verifyToken, ListController.updateList);
router.delete("/lists/:id", verifyToken, ListController.deleteList);
router.delete("/lists/entity/:id_entity", verifyToken, ListController.deleteEntityFromList);

module.exports = router;
