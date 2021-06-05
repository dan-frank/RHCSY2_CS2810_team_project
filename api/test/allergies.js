const { chai, api } = require("./chai-local");

describe("Allergies API", () => {
  /**
   * Test the GET route
   */
  describe("GET /allergies", () => {
    it("It should GET all the allergies", (done) => {
      chai
        .request(api)
        .get(`/allergies`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          response.body.length.should.be.eq(14);
          done();
        });
    });

    it("It should NOT GET all the allergies", (done) => {
      chai
        .request(api)
        .get(`/allergiess`)
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  /**
   * Test the GET route (by id)
   */
  describe("GET /allergies/:menuId", () => {
    it("It should GET the number of allergies for that ID", (done) => {
      const menuId = 1;
      chai
        .request(api)
        .get(`/allergies/${menuId}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          response.body.length.should.be.eq(3);
          done();
        });
    });

    it("It should GET allergies by ID", (done) => {
      const menuId = 3;
      chai
        .request(api)
        .get(`/allergies/${menuId}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          response.body.should.be.not.empty;
          response.body.length.should.be.eq(1);
          response.body[0].should.have.property("id").eq(6);
          response.body[0].should.have.property("menu_item_id").eq(menuId);
          response.body[0].should.have.property("name").eq("Eggs");
          response.body.length.should.be.eq(1);
          done();
        });
    });

    it("It should NOT GET a allergy by incorrect id", (done) => {
      const menuId = 999;
      chai
        .request(api)
        .get(`/allergies/${menuId}`)
        .end((err, response) => {
          response.should.have.status(404);
          response.body.should.be.a("object");
          response.body.should.have.property("error").eq("AllergyNotFound");
          done();
        });
    });
  });
});
