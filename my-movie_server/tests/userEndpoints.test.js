const app = require("../app");
const request = require("supertest");
const { reqAddUser, reqUpdateUser } = require("./data/userEndpoints.test.data");

let server;
beforeAll((done) => {
    port = 3005;
    server = app.listen(port, () => {
        console.log(`Test server started on port ${port}`);
    });
    done();
});

createdUserId = 0;
describe("POST /users", () => {
    test("Should create a user", async () => {
        return request(server)
            .post("/users")
            .send(reqAddUser)
            .expect(201)
            .then((res) => {
                console.log(res.body.message);
                expect(res.body.message).toEqual("User added successfully");
                createdUserId = res.body.id_user;
            });
    });

    test("Should return an error of existing user", async () => {
        return request(server)
            .post("/users")
            .send(reqAddUser)
            .expect(409)
            .then((res) => {
                console.log(res.body.error);
                expect(res.body.error).toEqual(`User username '${reqAddUser.username}' already exists`);
            });
    });
});

token = 0;
describe("GET /login", () => {
    test("Should login created user", async () => {
        return request(server)
            .get("/login")
            .send(reqAddUser)
            .expect(200)
            .then((res) => {
                console.log(res.body.token);
                expect(res.body.token.length).toBeGreaterThan(0);

                token = res.body.token;
            });
    });
});

describe("GET /users", () => {
    test("Should return all users", async () => {
        return request(server)
            .get("/users")
            .set("Authorization", token)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.body[res.body.length - 1].id_user).toBe(createdUserId);
            });
    });
});

describe("GET /users/:id", () => {
    test(`Should return created user`, async () => {
        return request(server)
            .get(`/users/${createdUserId}`)
            .set("Authorization", token)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((res) => {
                console.log(res.body);
                expect(res.statusCode).toBe(200);
                expect(res.body.username).toEqual(reqAddUser.username);
            });
    });
});
describe("PUT /users/:id", () => {
    test(`Should update created user`, async () => {
        return request(server)
            .put(`/users/${createdUserId}`)
            .set("Authorization", token)
            .send(reqUpdateUser)
            .expect(200)
            .then((res) => {
                console.log(res.body.message);
                expect(res.body.message).toEqual("User updated successfully");
            });
    });

    test(`Should return an error of unauthorized access`, async () => {
        return request(server)
            .put(`/users/1`)
            .set("Authorization", token)
            .send(reqUpdateUser)
            .expect(403)
            .then((res) => {
                console.log(res.body.message);
                expect(res.body.error).toEqual("Unauthorized, user is not an owner nor admin");
            });
    });
});

describe("GET /users/username/:username", () => {
    test(`Should return updated user`, async () => {
        return request(server)
            .get(`/users/username/${reqUpdateUser.username}`)
            .set("Authorization", token)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((res) => {
                console.log(res.body);
                expect(res.statusCode).toBe(200);
                expect(res.body.username).toEqual(reqUpdateUser.username);
                expect(res.body.id_user).toEqual(createdUserId);
            });
    });
});

describe("DELETE /users/:id", () => {
    test(`Should delete created`, async () => {
        return request(server)
            .delete(`/users/${createdUserId}`)
            .set("Authorization", token)
            .expect(200)
            .then((res) => {
                console.log(res.body.message);
                expect(res.body.message).toEqual("User deleted successfully");
            });
    });
});

afterAll((done) => {
    server.close(done);
});
