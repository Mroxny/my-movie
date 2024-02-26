const app = require("../app");
const request = require("supertest");
const { reqAddRate, reqAddInvalidRate, reqUpdateRate } = require("./data/rateEndpoints.test.data");
const { reqAdmin } = require("./data/adminUtils.test.data");

let server;
let token;
beforeAll(async () => {
    port = 3004;
    server = app.listen(port, () => {
        console.log(`Test server started on port ${port}`);
    });

    const loginResponse = await request(server).get("/login").send(reqAdmin);
    token = loginResponse.body.token;
    console.log("Token: " + token);
});

createdRateId = 0;
describe("POST /rates", () => {
    test("Should create a rate", async () => {
        return request(server)
            .post("/rates")
            .set("Authorization", token)
            .send(reqAddRate)
            .expect(201)
            .then((res) => {
                console.log(res.body.message);
                expect(res.body.message).toEqual("Rate added successfully");
                createdRateId = res.body.id_rate;
            });
    });
    test("Should return date error", async () => {
        return request(server)
            .post("/rates")
            .set("Authorization", token)
            .send(reqAddInvalidRate)
            .expect(400)
            .then((res) => {
                console.log(res.body.error);
                expect(res.body.error).toEqual(
                    "Invalid date format. Please provide the date in the format: YYYY-MM-DD HH:mm:ss"
                );
            });
    });
});

describe("GET /rates", () => {
    test("Should return all rates", async () => {
        return request(server)
            .get("/rates")
            .expect("Content-Type", /json/)
            .expect(200)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.body.rates[res.body.rates.length - 1].id_rate).toBe(createdRateId);
                expect(res.body.total_results).toBeGreaterThan(0);
            });
    });
});

describe("GET /rates/user/:idUser", () => {
    test(`Should return rates based on user`, async () => {
        return request(server)
            .get(`/rates/user/${reqAddRate.user_id}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((res) => {
                console.log("Rates by user: "+JSON.stringify(res.body));
                expect(res.statusCode).toBe(200);
                expect(res.body.total_results).toBeGreaterThan(0);
            });
    });
});

describe("GET /rates/user/:idUser/count", () => {
    test(`Should return num of user's rates`, async () => {
        return request(server)
            .get(`/rates/user/${reqAddRate.user_id}/count`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((res) => {
                console.log("Num of user rates: "+JSON.stringify(res.body));
                expect(res.statusCode).toBe(200);
                expect(res.body.rates).toBeGreaterThan(0);
            });
    });
});

describe("GET /rates/movie/:idMovie", () => {
    test(`Should return rates based on movie`, async () => {
        return request(server)
            .get(`/rates/movie/${reqAddRate.entity_id}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((res) => {
                console.log("Rates by movie: "+JSON.stringify(res.body));
                expect(res.body.total_results).toBeGreaterThan(0);
            });
    });
});

describe("PUT /rates/:id", () => {
    test(`Should update created rate`, async () => {
        return request(server)
            .put(`/rates/${createdRateId}`)
            .set("Authorization", token)
            .send(reqUpdateRate)
            .expect(200)
            .then((res) => {
                console.log(res.body.message);
                expect(res.body.message).toEqual("Rate updated successfully");
            });
    });
});

describe("GET /rates/:id", () => {
    test(`Should return created rate`, async () => {
        return request(server)
            .get(`/rates/${createdRateId}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((res) => {
                console.log(res.body);
                expect(res.statusCode).toBe(200);
                expect(res.body.rate_value).toEqual(reqUpdateRate.rate_value);
            });
    });
});

describe("DELETE /rate/:id", () => {
    test(`Should delete created rate`, async () => {
        return request(server)
            .delete(`/rates/${createdRateId}`)
            .set("Authorization", token)
            .expect(200)
            .then((res) => {
                console.log(res.body.message);
                expect(res.body.message).toEqual("Rate deleted successfully");
            });
    });
});

afterAll((done) => {
    server.close(done);
});
