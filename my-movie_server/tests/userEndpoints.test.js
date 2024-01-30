const app = require('../app'); 
const request = require("supertest");
const { reqAddUser, reqUpdateUser } = require("./userEndpoints.test.data");



describe("POST /users", () => {
    test("Should create a user", async () => {
        return request(app)
            .post("/users")
            .send(reqAddUser)
            .expect(201)
            .then(res => {
                console.log(res.body.message)
                expect(res.body.message).toEqual('User added successfully');
             })

    });
});

describe("POST /users", () => {
    test("Should return an error of existing user", async () => {
        return request(app)
            .post("/users")
            .send(reqAddUser)
            .expect(409)
            .then(res => {
                console.log(res.body.error)
                expect(res.body.error).toEqual(`User email '${reqAddUser.email}'already exists`);
             })

    });
});

token = 0
describe("GET /login", () => {
    test("Should login created user", async () => {
        return request(app)
            .get("/login")
            .send(reqAddUser)
            .expect(200)
            .then(res => {
                console.log(res.body.token)
                token = res.body.token
             })

    });
});

createdUserId = 0
describe("GET /users", () => {
    it("Should return all users", async () => {
        return request(app)
            .get("/users")
            .set('Authorization',  token)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                createdUserId = res.body[res.body.length-1].id_user
            })
    });
});

describe("GET /users/:id", () => {
    it(`Should return created user`, async () => {
        return request(app)
            .get(`/users/${createdUserId}`)
            .set('Authorization',  token)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                console.log(res.body)
                expect(res.statusCode).toBe(200);
                expect(res.body[0].email).toEqual(reqAddUser.email)
            })
    });
});
describe("PUT /users/:id", () => {
    test(`Should update created user`, async () => {
        return request(app)
            .put(`/users/${createdUserId}`)
            .set('Authorization',  token)
            .send(reqUpdateUser)
            .expect(200)
            .then(res => {
                console.log(res.body.message)
                expect(res.body.message).toEqual('User updated successfully');
             })

    });
});

describe("GET /users/email/:email", () => {
    it(`Should return updated user`, async () => {
        return request(app)
            .get(`/users/email/${reqUpdateUser.email}`)
            .set('Authorization',  token)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                console.log(res.body)
                expect(res.statusCode).toBe(200);
                expect(res.body[0].email).toEqual(reqUpdateUser.email)
                expect(res.body[0].id_user).toEqual(createdUserId)
            })
    });
});

describe("DELETE /users/:id", () => {
    test(`Should delete created`, async () => {
        return request(app)
            .delete(`/users/${createdUserId}`)
            .set('Authorization',  token)
            .expect(410)
            .then(res => {
                console.log(res.body.message)
                expect(res.body.message).toEqual('User deleted successfully');
             })

    });
});

