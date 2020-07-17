require("dotenv").config();
const PORT = process.env.APP_PORT;
const supertest = require("supertest");
const { expect } = require("chai");
const URL = `http://127.0.0.1:${PORT}/api`;
let token;
describe("User", () => {
  it("CREATE a user", async () => {
    let { body } = await supertest(URL)
      .post(`/auth/register`)
      .send({
        email: `rokdest@gmail.com`,
        username: "rokdest",
        password: "1111"
      })
      .set("Content-Type", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(body).to.be.an("object").and.not.empty;
  });
  it("Login user", async () => {
    let { body } = await supertest(URL)
      .post(`/auth/login`)
      .send({
        email: `rokdest@gmail.com`,
        username: "rokdest",
        password: "1111"
      })
      .set("Content-Type", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    token = body.token;
    expect(body).to.be.an("object").and.not.empty;
  });
  it("GET USER", async () => {
    let { body } = await supertest(URL)
      .get(`/auth/user`)
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(200);
    expect(body).to.be.an("object").and.not.empty;
  });
  it("DELETE USER", async () => {
    await supertest(URL)
      .delete(`/auth/user`)
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(200);
  });
});
