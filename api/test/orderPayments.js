const { chai, api } = require("./chai-local");
const { serialize } = require("../helpers");

describe("Order Payments API", () => {
  /**
   * Test the GET route
   */
  describe("GET /order_payments", () => {
    it("It should GET all the ordered items", (done) => {
      chai
        .request(api)
        .get(`/order_payments`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          response.body.length.should.be.eq(1);
          done();
        });
    });

    it("It should NOT GET all the ordered items", (done) => {
      chai
        .request(api)
        .get(`/order_paymentss`)
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  /**
   * Test the GET route (by id)
   */
  describe("GET /order_payments/:orderPaymentId", () => {
    it("It should GET a order payment", (done) => {
      const orderPaymentId = 1;
      chai
        .request(api)
        .get(`/order_payments/${orderPaymentId}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("id").eq(orderPaymentId);
          response.body.should.have.property("order_id").eq(1);
          response.body.should.have
            .property("payment_intent_id")
            .eq("pi_1IQfkPGFZKvUnuw293LNfUnd");
          response.body.should.have
            .property("payment_intent_status")
            .eq("succeeded");
          done();
        });
    });

    it("It should NOT GET a order payment", (done) => {
      const orderPaymentId = 999;
      chai
        .request(api)
        .get(`/order_payments/${orderPaymentId}`)
        .end((err, response) => {
          response.should.have.status(404);
          response.body.should.be.a("object");
          response.body.should.have
            .property("error")
            .eq("OrderPaymentNotFound");
          done();
        });
    });
  });

  /**
   * Test the GET route (by orderId)
   */
  describe("GET /order_payments/order/:orderId", () => {
    it("It should GET a order payment by order id", (done) => {
      const orderId = 1;
      chai
        .request(api)
        .get(`/order_payments/order/${orderId}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("id").eq(orderId);
          response.body.should.have.property("order_id").eq(1);
          response.body.should.have
            .property("payment_intent_id")
            .eq("pi_1IQfkPGFZKvUnuw293LNfUnd");
          response.body.should.have
            .property("payment_intent_status")
            .eq("succeeded");
          done();
        });
    });

    it("It should NOT GET a order payment by order id", (done) => {
      const orderId = 999;
      chai
        .request(api)
        .get(`/order_payments/order/${orderId}`)
        .end((err, response) => {
          response.should.have.status(404);
          response.body.should.have
            .property("error")
            .eq("OrderPaymentNotFound");
          done();
        });
    });
  });

  /**
   * Test the POST route
   */
  describe("POST /order_payments", () => {
    it("It should POST an order payment", (done) => {
      const orderPayment = serialize({
        orderId: 3,
        paymentIntentId: "pi_1IQfkPGFZKvUnuw293LNfOmd",
        paymentIntentStatus: "succeeded",
      });
      chai
        .request(api)
        .post(`/order_payments?${orderPayment}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("order_payment");
          done();
        });
    });

    it("It should NOT POST an order payment without orderId", (done) => {
      const orderPayment = serialize({
        paymentIntentId: "pi_1IQfkPGFZKvUnuw293LNfOmd",
        paymentIntentStatus: "succeeded",
      });
      chai
        .request(api)
        .post(`/order_payments?${orderPayment}`)
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a("object");
          response.body.should.have
            .property("error")
            .eq("OrderPaymentNotCreated");
          response.body.should.have.property("errors").length(1);
          done();
        });
    });

    it("It should NOT POST an order payment without paymentIntentId", (done) => {
      const orderPayment = serialize({
        orderId: 2,
        paymentIntentStatus: "succeeded",
      });
      chai
        .request(api)
        .post(`/order_payments?${orderPayment}`)
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a("object");
          response.body.should.have
            .property("error")
            .eq("OrderPaymentNotCreated");
          response.body.should.have.property("errors").length(1);
          done();
        });
    });

    it("It should NOT POST an order payment without paymentIntentStatus", (done) => {
      const orderPayment = serialize({
        orderId: 2,
        paymentIntentId: "pi_1IQfkPGFZKvUnuw293LNfOmd",
      });
      chai
        .request(api)
        .post(`/order_payments?${orderPayment}`)
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a("object");
          response.body.should.have
            .property("error")
            .eq("OrderPaymentNotCreated");
          response.body.should.have.property("errors").length(1);
          done();
        });
    });
  });
});
