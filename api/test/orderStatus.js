const { chai, api } = require("./chai-local");

describe("Order Status API", () => {
  /**
   * Test the GET route
   */
  describe("GET /order_status", () => {
    it("It should GET all the order_statuses", (done) => {
      chai
        .request(api)
        .get(`/order_status`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          response.body.length.should.be.eq(4);
          done();
        });
    });

    it("It should NOT GET all the order statuses", (done) => {
      chai
        .request(api)
        .get(`/order_statuss`)
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  /**
   * Test the GET route (by id)
   */
  describe("GET /order_status/:orderStatusId", () => {
    it("It should GET an order status by ID", (done) => {
      const orderStatusId = 1;
      chai
        .request(api)
        .get(`/order_status/${orderStatusId}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("id").eq(orderStatusId);
          response.body.should.have.property("status").eq("Ordered");
          done();
        });
    });

    it("It should NOT GET an order status by incorrect id", (done) => {
      const orderStatusId = 999;
      chai
        .request(api)
        .get(`/order_status/${orderStatusId}`)
        .end((err, response) => {
          response.should.have.status(404);
          response.body.should.be.a("object");
          response.body.should.have.property("error").eq("OrderStatusNotFound");
          done();
        });
    });
  });
});
