const app = require('../app'); 
const request = require("supertest");
const { reqAddRate, reqUpdateRate } = require("./rateEndpoints.test.data");
const { reqAddUser } = require("./userEndpoints.test.data");

token = 0
describe("GET /login", () => {
    test("Should login user", async () => {
        return request(app)
            .get("/login")
            .send(reqAddUser)
            .expect(200)
            .then(res => {
                console.log(res.body.token)
                expect(res.body.token.length).toBeGreaterThan(0);

                token = res.body.token
             })
    });
});

describe("POST /rates", () => {
    test("Should create a rate", async () => {
        return request(app)
            .post("/rate")
            .set('Authorization',  token)
            .send(reqAddRate)
            .expect(201)
            .then(res => {
                console.log(res.body.message)
                expect(res.body.message).toEqual('Rate added successfully');
             })

    });
});


createdRateId = 0
describe("GET /rates", () => {
    it("Should return all rates", async () => {
        return request(app)
            .get("/rates")
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                createdRateId = res.body[res.body.length-1].id_user
            })
    });
});


describe("GET /rates/user/:idUser", () => {
    it(`Should return rates based on user`, async () => {
        return request(app)
            .get(`/rates/user/${reqAddRate.user_id}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                console.log(res.body)
                expect(res.statusCode).toBe(200);
                expect(res.body.length).toEqual(4)
            })
    });
}); 

describe("GET /rates/user/:idUser/count", () => {
    it(`Should return num of user's rates`, async () => {
        return request(app)
            .get(`/rates/user/${reqAddRate.user_id}/count`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                console.log(res.body)
                expect(res.statusCode).toBe(200);
                expect(res.body.rates).toEqual(2)
            })
    });
});

describe("GET /rates/movie/:idMovie", () => {
    it(`Should return rates based on movie`, async () => {
        return request(app)
            .get(`/rates/movie/${reqAddRate.movie_id}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                console.log(res.body)
                expect(res.statusCode).toBe(200);
                expect(res.body.length).toEqual(1)
            })
    });
});

describe("PUT /rates/:id", () => {
    test(`Should update created rate`, async () => {
        return request(app)
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
    it(`Should return created rate`, async () => {
        return request(app)
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
        return request(app)
            .delete(`/rate/${createdRateId}`)
            .set('Authorization',  token)
            .expect(200)
            .then(res => {
                console.log(res.body.message)
                expect(res.body.message).toEqual('Rate deleted successfully');
             })

    });
});

