const { chai, api } = require("./chai-local");
const { serialize } = require("../helpers");

describe("Checkout API", () => {
  /**
   * Test the POST route
   */
  describe("POST /checkout", () => {
    it("It should create a Stripe client secret", (done) => {
      const checkout = serialize({
        amount: 100,
      });
      chai
        .request(api)
        .post(`/checkout?${checkout}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("client_secret");
          done();
        });
    });

    it("It should NOT create a Stripe client secret", (done) => {
      chai
        .request(api)
        .post(`/checkout`)
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.have
            .property("error")
            .eq("ClientSecretNotGenerated");
          response.body.should.have.property("errors").length(1);
          done();
        });
    });
  });
});
