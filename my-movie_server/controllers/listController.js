const Controller = require("./controller");
const List = require("../models/listModel");

class ListController extends Controller {

    static getAllLists(req, res) {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;

        if (limit > super.maxQueryLimit) {
            res.status(400).json({ error: `Invalid page limit: ${limit}. Max is ${super.maxQueryLimit}` });
            return;
        }

        const offset = (page - 1) * limit;
        const table = "lists";
        const condition = "1= ?";
        const value = 1;
        super.getCountInTable(table, condition, value,(err, totalCount) => {
            if (err) {
                res.status(500).json({ error: "Server error" });
            } else {
                const totalPages = Math.ceil(totalCount / limit);
                List.getAll(limit, offset, (err, result) => {
                    if (err) {
                        res.status(500).json({ error: "Server error" });
                    } else {
                        res.status(200).json({
                            lists: result,
                            total_results: totalCount,
                            total_pages: totalPages,
                        });
                    }
                });
            }
        });
    }

    static getListById(req, res) {
        const idList = req.params.id;

        List.getById(idList, (err, result) => {
            if (err) {
                res.status(500).json({ error: "Server error" });
            } else {
                res.json(result[0]);
            }
        });
    }

    static getListByRoom(req, res) {
        const roomId = parseInt(req.params.roomId);
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;

        if (limit > super.maxQueryLimit) {
            res.status(400).json({ error: `Invalid page limit: ${limit}. Max is ${super.maxQueryLimit}` });
            return;
        }

        if (roomId < 1) {
            res.status(400).json({ error: `Invalid room id: '${roomId}'.` });
            return;
        }

        const offset = (page - 1) * limit;
        const table = "lists";
        const condition = "room_id = ?";
        const value = roomId;

        console.log("room in query: " + roomId);
        super.getCountInTable(table, condition, value,(err, totalCount) => {
            if (err) {
                res.status(500).json({ error: "Server error" });
            } else {
                const totalPages = Math.ceil(totalCount / limit);
                List.getByRoom(roomId, limit, offset, (err, result) => {
                    if (err) {
                        res.status(500).json({ error: "Server error" });
                    } else {
                        res.status(200).json({
                            lists: result,
                            total_results: totalCount,
                            total_pages: totalPages,
                        });
                    }
                });
            }
        });
    }

    static getEntitiesByListId(req, res) {
        const idList = parseInt(req.params.id);
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;

        if (limit > super.maxQueryLimit) {
            res.status(400).json({ error: `Invalid page limit: ${limit}. Max is ${super.maxQueryLimit}` });
            return;
        }

        if (idList < 1) {
            res.status(400).json({ error: `Invalid list id: '${idList}'.` });
            return;
        }

        const offset = (page - 1) * limit;
        const table = "entityInList";
        const condition = "list_id = ?";
        const value = idList;

        super.getCountInTable(table, condition, value,(err, totalCount) => {
            if (err) {
                res.status(500).json({ error: "Server error" });
            } else {
                const totalPages = Math.ceil(totalCount / limit);
                List.getEntities(idList, limit, offset, (err, result) => {
                    if (err) {
                        res.status(500).json({ error: "Server error" });
                    } else {
                        res.status(200).json({
                            entities: result,
                            total_results: totalCount,
                            total_pages: totalPages,
                        });
                    }
                });
            }
        });
    }

    static addList(req, res) {
        const { room_id, name } = req.body;

        console.log(req.body);
        if (!room_id || !name) {
            res.status(400).json({ error: "Invalid input data" });
            return;
        }

        const listData = { room_id, name };

        List.addList(listData, (err, result) => {
            if (err) {
                res.status(500).json({ error: `Server error. Couldn't create new list` });
            } else {
                res.status(201).json(result);
            }
        });
    }

    static addEntityToList(req, res) {
        const list_id = req.params.id;
        const { entity_type, entity_id } = req.body;

        console.log(req.body);
        if (!list_id || !entity_type || !entity_id) {
            res.status(400).json({ error: "Invalid input data" });
            return;
        }

        const listData = { list_id, entity_type, entity_id };

        List.addEntityToList(listData, (err, result) => {
            if (err) {
                res.status(500).json({ error: `Server error. Couldn't create new entity in list` });
            } else {
                res.status(201).json(result);
            }
        });
    }

    static updateList(req, res) {
        const idList = req.params.id;
        const { room_id, name } = req.body;

        if (!room_id && !name) {
            res.status(400).json({ error: "Invalid input data" });
            return;
        }

        List.getById(idList, (err, list) => {
            if (err) {
                res.status(500).json({ error: "Server error. Couldn't search for given list " });
            } else {
                if (!list) {
                    res.status(404).json({ error: "List not found" });
                } else {
                    const updatedData = {};

                    if (room_id !== undefined) {
                        updatedData.room_id = room_id;
                    }

                    if (name !== undefined) {
                        updatedData.name = name;
                    }

                    List.updateList(idList, updatedData, (err, result) => {
                        if (err) {
                            res.status(500).json({ error: "Server error. Couldn't update list" });
                        } else {
                            res.status(200).json(result);
                        }
                    });
                }
            }
        });
    }

    static deleteList(req, res) {
        const idList = req.params.id;

        List.deleteList(idList, (err, result) => {
            if (err) {
                res.status(500).json({ error: "Server error. Couldn't delete list" });
            } else {
                res.status(200).json(result);
            }
        });
    }

    static deleteEntityFromList(req, res) {
        const idList = req.params.id;

        List.deleteEntityFromList(idList, (err, result) => {
            if (err) {
                res.status(500).json({ error: "Server error. Couldn't delete entity from list" });
            } else {
                res.status(200).json(result);
            }
        });
    }
}

module.exports = ListController;
