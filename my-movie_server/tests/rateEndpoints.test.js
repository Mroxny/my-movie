const app = require('../app'); 
const request = require("supertest");
const { reqAddRate, reqUpdateRate } = require("./data/rateEndpoints.test.data");
const { reqAdmin } = require("./data/adminUtils.test.data");

let server;
beforeAll(done => {
    port = 3004
    server = app.listen(port, () => {
      console.log(`Test server started on port ${port}`);
    });
    done();
  });

token = 0
describe("GET /login", () => {
    test("Should login user", async () => {
        return request(server)
            .get("/login")
            .send(reqAdmin)
            .expect(200)
            .then(res => {
                console.log(res.body.token)
                expect(res.body.token.length).toBeGreaterThan(0);

                token = res.body.token
             })
    });
});

createdRateId = 0
describe("POST /rates", () => {
    test("Should create a rate", async () => {
        return request(server)
            .post("/rates")
            .set('Authorization',  token)
            .send(reqAddRate)
            .expect(201)
            .then(res => {
                console.log(res.body.message)
                expect(res.body.message).toEqual('Rate added successfully');
                createdRateId = res.body.id_rate

             })

    });
});


describe("GET /rates", () => {
    test("Should return all rates", async () => {
        return request(server)
            .get("/rates")
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.body[res.body.length-1].id_rate).toBe(createdRateId);
            })
    });
});


describe("GET /rates/user/:idUser", () => {
    test(`Should return rates based on user`, async () => {
        return request(server)
            .get(`/rates/user/${reqAddRate.user_id}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                console.log(res.body)
                expect(res.statusCode).toBe(200);
            })
    });
}); 

describe("GET /rates/user/:idUser/count", () => {
    test(`Should return num of user's rates`, async () => {
        return request(server)
            .get(`/rates/user/${reqAddRate.user_id}/count`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                console.log(res.body)
                expect(res.statusCode).toBe(200);
            })
    });
});

describe("GET /rates/movie/:idMovie", () => {
    test(`Should return rates based on movie`, async () => {
        return request(server)
            .get(`/rates/movie/${reqAddRate.movie_id}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                console.log(res.body)
                expect(res.statusCode).toBe(200);
            })
    });
});

describe("PUT /rates/:id", () => {
    test(`Should update created rate`, async () => {
        return request(server)
            .put(`/rates/${createdRateId}`)
            .set('Authorization',  token)
            .send(reqUpdateRate)
            .expect(200)
            .then(res => {
                console.log(res.body.message)
                expect(res.body.message).toEqual('Rate updated successfully');
             })

    });
});

describe("GET /rates/:id", () => {
    test(`Should return created rate`, async () => {
        return request(server)
            .get(`/rates/${createdRateId}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                console.log(res.body)
                expect(res.statusCode).toBe(200);
                expect(res.body.rate_value).toEqual(reqUpdateRate.rate_value)
            })
    });
});

describe("DELETE /rate/:id", () => {
    test(`Should delete created rate`, async () => {
        return request(server)
            .delete(`/rates/${createdRateId}`)
            .set('Authorization',  token)
            .expect(200)
            .then(res => {
                console.log(res.body.message)
                expect(res.body.message).toEqual('Rate deleted successfully');
             })

    });
    
});

afterAll(done => {
    server.close(done);
  });