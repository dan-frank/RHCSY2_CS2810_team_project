const { chai, api } = require("./chai-local");

describe("Ordered Items API", () => {
  /**
   * Test the GET route
   */
  describe("GET /ordered_items", () => {
    it("It should GET all the ordered items", (done) => {
      chai
        .request(api)
        .get(`/ordered_items`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          response.body.length.should.be.eq(7);
          done();
        });
    });

    it("It should NOT GET all the ordered items", (done) => {
      chai
        .request(api)
        .get(`/ordered_itemss`)
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  /**
   * Test the GET route (by id)
   */
  describe("GET /ordered_items/item/:orderedItemId", () => {
    it("It should GET an order item by ID", (done) => {
      const orderedItemId = 1;
      chai
        .request(api)
        .get(`/ordered_items/item/${orderedItemId}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("id").eq(orderedItemId);
          response.body.should.have.property("order_id").eq(1);
          response.body.should.have.property("menu_item_id").eq(1);
          response.body.should.have.property("item_count").eq(1);
          done();
        });
    });

    it("It should NOT GET an order item by incorrect id", (done) => {
      const orderedItemId = 999;
      chai
        .request(api)
        .get(`/ordered_items/item/${orderedItemId}`)
        .end((err, response) => {
          response.should.have.status(404);
          response.body.should.be.a("object");
          response.body.should.have.property("error").eq("OrderedItemNotFound");
          done();
        });
    });
  });

  /**
   * Test the GET route (by orderId)
   */
  describe("GET /ordered_items/:orderId", () => {
    const orderIdAndLength = [
      {
        orderId: 1,
        expectedLength: 4,
      },
      {
        orderId: 2,
        expectedLength: 3,
      },
    ];
    orderIdAndLength.forEach((currentTest) => {
      it(`It should GET all order items by order ID (${currentTest.orderId})`, (done) => {
        chai
          .request(api)
          .get(`/ordered_items/${currentTest.orderId}`)
          .end((err, response) => {
            response.should.have.status(200);
            response.body.should.be.a("array");
            response.body.length.should.be.eq(currentTest.expectedLength);
            done();
          });
      });
    });

    it("It should NOT GET all order items by incorrect order ID", (done) => {
      const orderId = 999;
      chai
        .request(api)
        .get(`/ordered_items/${orderId}`)
        .end((err, response) => {
          response.should.have.status(404);
          response.body.should.be.a("object");
          response.body.should.have
            .property("error")
            .eq("OrderedItemsNotFound");
          done();
        });
    });
  });

  /**
   * Test the POST route
   */
  describe("POST /ordered_items/:orderId", () => {
    it("It should POST all ordered items by order ID", (done) => {
      const orderId = 2;
      chai
        .request(api)
        .post(
          `/ordered_items/${orderId}?menuItemIds[0]=1&menuItemIds[1]=2&menuItemIds[2]=3&menuItemCounts[0]=1&menuItemCounts[1]=1&menuItemCounts[2]=3`
        )
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("orderId").eq(`${orderId}`);
          response.body.should.have.property("menuItemIds");
          response.body.should.have.property("menuItemCounts");
          response.body.should.have.property("price").eq(5495);
          done();
        });
    });

    it("It should NOT POST all ordered items by order ID without orderId", (done) => {
      const orderId = 2;
      chai
        .request(api)
        .post(
          `/ordered_items?menuItemIds[0]=1&menuItemIds[1]=2&menuItemIds[2]=3&menuItemCounts[0]=1&menuItemCounts[1]=1&menuItemCounts[2]=3`
        )
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });

    it("It should NOT POST all ordered items by order ID without menuItemIds", (done) => {
      const orderId = 2;
      chai
        .request(api)
        .post(
          `/ordered_items/${orderId}?menuItemCounts[0]=1&menuItemCounts[1]=1&menuItemCounts[2]=3`
        )
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a("object");
          response.body.should.have
            .property("error")
            .eq("OrderedItemsNotCreated");
          response.body.should.have.property("errors").length(1);
          done();
        });
    });

    it("It should NOT POST all ordered items by order ID without menuItemCounts", (done) => {
      const orderId = 2;
      chai
        .request(api)
        .post(
          `/ordered_items/${orderId}?menuItemIds[0]=1&menuItemIds[1]=2&menuItemIds[2]=3`
        )
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a("object");
          response.body.should.have
            .property("error")
            .eq("OrderedItemsNotCreated");
          response.body.should.have.property("errors").length(1);
          done();
        });
    });
  });
});
