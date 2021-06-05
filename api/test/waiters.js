const { chai, api } = require("./chai-local");

describe("Waiters API", () => {
  /**
   * Test the GET route
   */
  describe("GET /waiters", () => {
    it("It should GET all the waiters", (done) => {
      chai
        .request(api)
        .get(`/waiters`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          response.body.length.should.be.eq(3);
          done();
        });
    });

    it("It should NOT GET all the waiters", (done) => {
      chai
        .request(api)
        .get(`/waiterss`)
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  /**
   * Test the GET (by id) route
   */
  describe("GET /waiters/:waiterId", () => {
    it("It should GET a waiter by id", (done) => {
      const waiterId = 1;
      chai
        .request(api)
        .get(`/waiters/${waiterId}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("name").eq("John");
          done();
        });
    });

    it("It should NOT GET a waiter with incorrect id", (done) => {
      const waiterId = 999;
      chai
        .request(api)
        .get(`/waiters/${waiterId}`)
        .end((err, response) => {
          response.should.have.status(404);
          response.body.should.be.a("object");
          response.body.should.have.property("error").eq("WaiterNotFound");
          done();
        });
    });
  });
});
