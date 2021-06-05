const { chai, api } = require("./chai-local");

describe("Categories API", () => {
  /**
   * Test the GET route
   */
  describe("GET /categories", () => {
    it("It should GET all the categories", (done) => {
      chai
        .request(api)
        .get(`/categories`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          response.body.length.should.be.eq(3);
          done();
        });
    });

    it("It should NOT GET all the categories", (done) => {
      chai
        .request(api)
        .get(`/categoriess`)
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  /**
   * Test the GET route (by id)
   */
  describe("GET /categories/:categoryId", () => {
    it("It should GET a category by ID", (done) => {
      const categoryId = 1;
      chai
        .request(api)
        .get(`/categories/${categoryId}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("id").eq(categoryId);
          response.body.should.have.property("name").eq("Starter");
          response.body.should.have.property("slug").eq("starter");
          response.body.should.have
            .property("description")
            .eq("A starter is...");
          done();
        });
    });

    it("It should NOT GET a category by incorrect id", (done) => {
      const categoryId = 999;
      chai
        .request(api)
        .get(`/categories/${categoryId}`)
        .end((err, response) => {
          response.should.have.status(404);
          response.body.should.be.a("object");
          response.body.should.have.property("error").eq("CategoryNotFound");
          done();
        });
    });
  });
});
