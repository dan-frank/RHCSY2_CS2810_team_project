let { chai, api } = require("./chai-local");
const { serialize } = require("../helpers");

describe("Orders API", () => {
  /**
   * Test the GET route
   */
  describe("GET /orders", () => {
    it("It should GET all the orders", (done) => {
      chai
        .request(api)
        .get(`/orders`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          response.body.length.should.be.eq(3);
          done();
        });
    });

    it("It should GET all the orders matching orderStatusId", (done) => {
      const order = serialize({
        orderStatus: 2,
      });
      chai
        .request(api)
        .get(`/orders?${order}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          response.body.length.should.be.eq(2);
          done();
        });
    });

    it("It should NOT GET all the orders", (done) => {
      chai
        .request(api)
        .get(`/orderss`)
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  /**
   * Test the GET (by id) route
   */
  describe("GET /orders/:orderId", () => {
    it("It should GET an order by id", (done) => {
      const orderId = 1;
      chai
        .request(api)
        .get(`/orders/${orderId}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("id").eq(1);
          response.body.should.have.property("table_number").eq(18);
          response.body.should.have.property("price").eq(4196);
          response.body.should.have.property("discount").eq(0);
          response.body.should.have.property("final_price").eq(4196);
          response.body.should.have
            .property("comment")
            .eq("This is a test order");
          response.body.should.have.property("waiter_id");
          response.body.should.have.property("order_status_id").eq(1);
          response.body.should.have.property("food_ready_at");
          response.body.should.have.property("updated_at");
          done();
        });
    });

    it("It should NOT GET an order by incorrect id", (done) => {
      const orderId = 999;
      chai
        .request(api)
        .get(`/orders/${orderId}`)
        .end((err, response) => {
          response.should.have.status(404);
          response.body.should.be.a("object");
          response.body.should.have.property("error");
          response.body.should.have.property("error").eq("OrderNotFound");
          done();
        });
    });
  });

  /**
   * Test the POST route
   */
  describe("POST /orders/:orderId", () => {
    it("It should POST a new order", (done) => {
      const order = serialize({
        tableNumber: 43,
        orderStatus: 1,
      });
      chai
        .request(api)
        .post(`/orders?${order}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("id").eq(4);
          done();
        });
    });

    it("It should NOT POST a new order without tableNumber", (done) => {
      const order = serialize({
        orderStatus: 1,
      });
      chai
        .request(api)
        .post(`/orders?${order}`)
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a("object");
          response.body.should.have.property("error").eq("OrderNotCreated");
          response.body.should.have.property("errors").length("1");
          done();
        });
    });

    it("It should NOT POST a new order without orderStatus", (done) => {
      const order = serialize({
        tableNumber: 43,
      });
      chai
        .request(api)
        .post(`/orders?${order}`)
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a("object");
          response.body.should.have.property("error").eq("OrderNotCreated");
          response.body.should.have.property("errors").length("1");
          done();
        });
    });
  });

  /**
   * Test the PUT (by id) route
   */
  describe("PUT /orders/:orderId", () => {
    it("It should PUT an existing order", (done) => {
      const order = serialize({
        orderId: 4,
        orderStatus: 2,
      });
      chai
        .request(api)
        .put(`/orders/order_status?${order}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.have.property("orderId").eq(4);
          response.body.should.have.property("orderStatus").eq(2);
          done();
        });
    });

    it("It should NOT PUT an existing without orderId", (done) => {
      const order = serialize({
        orderStatus: 2,
      });
      chai
        .request(api)
        .put(`/orders/order_status?${order}`)
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a("object");
          response.body.should.have
            .property("error")
            .eq("OrderStatusNotUpdated");
          response.body.should.have.property("errors").length("1");
          done();
        });
    });

    it("It should NOT PUT an existing without orderStatus", (done) => {
      const order = serialize({
        orderId: 4,
      });
      chai
        .request(api)
        .put(`/orders/order_status?${order}`)
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a("object");
          response.body.should.have
            .property("error")
            .eq("OrderStatusNotUpdated");
          response.body.should.have.property("errors").length("1");
          done();
        });
    });
  });
});
