const app = require('../app'); 
const request = require("supertest");
const { reqaddUser } = require("./userEndpoints.test.data");



describe("POST /users", () => {
    test("Should create a user", async () => {
        return request(app)
            .post("/users")
            // .set('Authorization',  `Bearer ${token}`)
            .send(reqaddUser)
            .expect(201)
            .then(res => {
                console.log(res.body.message)
                expect(res.body.message).toEqual('User added successfully');
             })

    });
});

createdUserId = 0
describe("GET /users", () => {
    it("Should return all users", async () => {
        return request(app)
            .get("/users")
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
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                console.log(res.body)
                expect(res.statusCode).toBe(200);
                expect(res.body[0].email).toEqual(reqaddUser.email)
            })
    });
});

describe("DELETE /users/:id", () => {
    test(`Should delete created`, async () => {
        return request(app)
            .delete(`/users/${createdUserId}`)
            // .set('Authorization',  `Bearer ${token}`)
            .send(reqaddUser)
            .expect(410)


    });
});

