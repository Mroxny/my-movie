const app = require("../app");
const request = require("supertest");
const { reqAddList, reqAddEntity, reqUpdateList } = require("./data/listEndpoints.test.data");
const { reqAdmin } = require("./data/adminUtils.test.data");

let server;
let token;
beforeAll(async () => {
    port = 3006;
    server = app.listen(port, () => {
        console.log(`Test server started on port ${port}`);
    });

    const loginResponse = await request(server).get("/login").send(reqAdmin);
    token = loginResponse.body.token;
    console.log("Token: " + token);
});

createdListId = 0;
describe("POST /lists", () => {
    test("Should create a list", async () => {
        return request(server)
            .post("/lists")
            .set("Authorization", token)
            .send(reqAddList)
            .expect(201)
            .then((res) => {
                console.log(res.body.message);
                expect(res.body.message).toEqual("List added successfully");
                createdListId = res.body.id;
            });
    });
});

createdEntityId = 0;
describe("POST /lists/:id/entity", () => {
    test("Should create an entity", async () => {
        return request(server)
            .post(`/lists/${createdListId}/entity`)
            .set("Authorization", token)
            .send(reqAddEntity)
            .expect(201)
            .then((res) => {
                console.log(res.body.message);
                expect(res.body.message).toEqual("Entity added successfully");
                createdEntityId = res.body.id;
            });
    });
});

describe("GET /lists", () => {
    test("Should return all lists", async () => {
        return request(server)
            .get("/lists")
            .set("Authorization", token)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.body[res.body.length - 1].id_list).toBe(createdListId);
            });
    });
});

describe("GET /lists/:id/entities", () => {
    test(`Should return entities based on list`, async () => {
        return request(server)
            .get(`/lists/${createdListId}/entities`)
            .set("Authorization", token)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((res) => {
                console.log(res.body);
                expect(res.body[res.body.length - 1].id_entity_in_list).toBe(createdEntityId);
            });
    });
});

describe("GET lists/room/:roomId", () => {
    test(`Should return room's lists`, async () => {
        return request(server)
            .get(`/lists/room/1`)
            .set("Authorization", token)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((res) => {
                console.log(res.body);
                expect(res.body.length).toBeGreaterThan(0);
            });
    });
});

describe("PUT /lists/:id", () => {
    test(`Should update created list`, async () => {
        return request(server)
            .put(`/lists/${createdListId}`)
            .set("Authorization", token)
            .send(reqUpdateList)
            .expect(200)
            .then((res) => {
                console.log(res.body.message);
                expect(res.body.message).toEqual("List updated successfully");
            });
    });
});

describe("GET /lists/:id", () => {
    test(`Should return created list`, async () => {
        return request(server)
            .get(`/lists/${createdListId}`)
            .set("Authorization", token)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((res) => {
                console.log(res.body);
                expect(res.body.name).toEqual(reqUpdateList.name);
            });
    });
});

describe("DELETE /lists/entity/:id_entity", () => {
    test(`Should delete created rate`, async () => {
        return request(server)
            .delete(`/lists/entity/${createdEntityId}`)
            .set("Authorization", token)
            .expect(200)
            .then((res) => {
                console.log(res.body.message);
                expect(res.body.message).toEqual("Entity deleted successfully");
            });
    });
});

describe("DELETE /lists/:id", () => {
    test(`Should delete created rate`, async () => {
        return request(server)
            .delete(`/lists/${createdListId}`)
            .set("Authorization", token)
            .expect(200)
            .then((res) => {
                console.log(res.body.message);
                expect(res.body.message).toEqual("List deleted successfully");
            });
    });
});

afterAll((done) => {
    server.close(done);
});
