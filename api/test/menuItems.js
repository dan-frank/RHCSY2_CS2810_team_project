const { chai, api } = require("./chai-local");
const { serialize } = require("../helpers");

describe("Menu Items API", () => {
  /**
   * Test the GET route
   */
  describe("GET /menu_items", () => {
    it("It should GET all the menu items", (done) => {
      chai
        .request(api)
        .get(`/menu_items`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          response.body.length.should.be.eq(9);
          done();
        });
    });

    it("It should NOT GET all the menu items", (done) => {
      chai
        .request(api)
        .get(`/menu_itemss`)
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  /**
   * Test the GET (by id) route
   */
  describe("GET /menu_items/:menuItemId", () => {
    it("It should GET a menu item by id", (done) => {
      const menuItemId = 1;
      chai
        .request(api)
        .get(`/menu_items/${menuItemId}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("id");
          response.body.should.have.property("category_id");
          response.body.should.have.property("category_name");
          response.body.should.have.property("category_slug");
          response.body.should.have.property("title");
          response.body.should.have.property("description");
          response.body.should.have.property("calories");
          response.body.should.have.property("price");
          response.body.should.have.property("deleted");
          response.body.should.have.property("id").eq(menuItemId);
          done();
        });
    });

    it("It should NOT GET a menu item by id", (done) => {
      const menuItemId = 999;
      chai
        .request(api)
        .get(`/menu_items/${menuItemId}`)
        .end((err, response) => {
          response.should.have.status(404);
          response.body.should.be.a("object");
          response.body.should.have.property("error");
          response.body.should.have.property("error").eq("MenuItemNotFound");
          done();
        });
    });
  });

  /**
   * Test the POST route
   */
  describe("POST /menu_items", () => {
    it("It should POST a new menu item", (done) => {
      const menuItem = {
        categoryId: 1,
        title: "New Menu Item",
        description: "This is a new menu item",
        calories: 203,
        price: 349,
      };
      chai
        .request(api)
        .post(`/menu_items?` + serialize(menuItem))
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("id").eq(10);
          response.body.should.have.property("category_id").eq(1);
          response.body.should.have.property("title").eq("New Menu Item");
          response.body.should.have
            .property("description")
            .eq("This is a new menu item");
          response.body.should.have.property("calories").eq("203");
          response.body.should.have.property("price").eq("349");
          response.body.should.have.property("deleted").eq(false);
          done();
        });
    });

    it("It should NOT POST a new menu item without categoryId", (done) => {
      const menuItem = {
        title: "New Menu Item",
        description: "This is a new menu item",
        calories: 203,
        price: 349,
      };
      chai
        .request(api)
        .post(`/menu_items?` + serialize(menuItem))
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a("object");
          response.body.should.have.property("error").eq("MenuItemNotCreated");
          response.body.should.have.property("errors").length(1);
          done();
        });
    });

    it("It should NOT POST a new menu item without title", (done) => {
      const menuItem = {
        categoryId: 1,
        description: "This is a new menu item",
        calories: 203,
        price: 349,
      };
      chai
        .request(api)
        .post(`/menu_items?` + serialize(menuItem))
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a("object");
          response.body.should.have.property("error").eq("MenuItemNotCreated");
          response.body.should.have.property("errors").length(1);
          done();
        });
    });

    it("It should NOT POST a new menu item without description", (done) => {
      const menuItem = {
        categoryId: 1,
        title: "New Menu Item",
        calories: 203,
        price: 349,
      };
      chai
        .request(api)
        .post(`/menu_items?` + serialize(menuItem))
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a("object");
          response.body.should.have.property("error").eq("MenuItemNotCreated");
          response.body.should.have.property("errors").length(1);
          done();
        });
    });

    it("It should NOT POST a new menu item without calories", (done) => {
      const menuItem = {
        categoryId: 1,
        title: "New Menu Item",
        description: "This is a new menu item",
        price: 349,
      };
      chai
        .request(api)
        .post(`/menu_items?` + serialize(menuItem))
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a("object");
          response.body.should.have.property("error").eq("MenuItemNotCreated");
          response.body.should.have.property("errors").length(1);
          done();
        });
    });

    it("It should NOT POST a new menu item without price", (done) => {
      const menuItem = {
        categoryId: 1,
        title: "New Menu Item",
        description: "This is a new menu item",
        calories: 203,
      };
      chai
        .request(api)
        .post(`/menu_items?` + serialize(menuItem))
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a("object");
          response.body.should.have.property("error").eq("MenuItemNotCreated");
          response.body.should.have.property("errors").length(1);
          done();
        });
    });
  });

  /**
   * Test the PUT route
   */
  describe("PUT /menu_items/:menuItemId", () => {
    it("It should PUT an existing menu item", (done) => {
      menuItemId = 1;
      const menuItem = {
        categoryId: 3,
        title: "Edited Desert",
        description: "This is an edited menu item",
        calories: 123,
        price: 499,
      };
      chai
        .request(api)
        .put(`/menu_items/${menuItemId}?` + serialize(menuItem))
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("id").eq(menuItemId);
          response.body.should.have.property("category_id").eq(3);
          response.body.should.have.property("title").eq("Edited Desert");
          response.body.should.have
            .property("description")
            .eq("This is an edited menu item");
          response.body.should.have.property("calories").eq("123");
          response.body.should.have.property("price").eq("499");
          response.body.should.have.property("deleted").eq(false);
          done();
        });
    });

    it("It should PUT an existing menu item with only categoryId", (done) => {
      menuItemId = 1;
      const menuItem = {
        categoryId: 2,
      };
      chai
        .request(api)
        .put(`/menu_items/${menuItemId}?` + serialize(menuItem))
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("id").eq(menuItemId);
          response.body.should.have.property("category_id").eq(2);
          response.body.should.have.property("title").eq("Edited Desert");
          response.body.should.have
            .property("description")
            .eq("This is an edited menu item");
          response.body.should.have.property("calories").eq("123");
          response.body.should.have.property("price").eq("499");
          response.body.should.have.property("deleted").eq(false);
          done();
        });
    });

    it("It should PUT an existing menu item with only title", (done) => {
      menuItemId = 1;
      const menuItem = {
        title: "Desert Second Edit",
      };
      chai
        .request(api)
        .put(`/menu_items/${menuItemId}?` + serialize(menuItem))
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("id").eq(menuItemId);
          response.body.should.have.property("category_id").eq(2);
          response.body.should.have.property("title").eq("Desert Second Edit");
          response.body.should.have
            .property("description")
            .eq("This is an edited menu item");
          response.body.should.have.property("calories").eq("123");
          response.body.should.have.property("price").eq("499");
          response.body.should.have.property("deleted").eq(false);
          done();
        });
    });

    it("It should PUT an existing menu item with only title", (done) => {
      menuItemId = 1;
      const menuItem = {
        description: "This menu item has been edited three times",
      };
      chai
        .request(api)
        .put(`/menu_items/${menuItemId}?` + serialize(menuItem))
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("id").eq(menuItemId);
          response.body.should.have.property("category_id").eq(2);
          response.body.should.have.property("title").eq("Desert Second Edit");
          response.body.should.have
            .property("description")
            .eq("This menu item has been edited three times");
          response.body.should.have.property("calories").eq("123");
          response.body.should.have.property("price").eq("499");
          response.body.should.have.property("deleted").eq(false);
          done();
        });
    });

    it("It should PUT an existing menu item with only calories", (done) => {
      menuItemId = 1;
      const menuItem = {
        calories: 472,
      };
      chai
        .request(api)
        .put(`/menu_items/${menuItemId}?` + serialize(menuItem))
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("id").eq(menuItemId);
          response.body.should.have.property("category_id").eq(2);
          response.body.should.have.property("title").eq("Desert Second Edit");
          response.body.should.have
            .property("description")
            .eq("This menu item has been edited three times");
          response.body.should.have.property("calories").eq("472");
          response.body.should.have.property("price").eq("499");
          response.body.should.have.property("deleted").eq(false);
          done();
        });
    });

    it("It should PUT an existing menu item with only calories", (done) => {
      menuItemId = 1;
      const menuItem = {
        price: 799,
      };
      chai
        .request(api)
        .put(`/menu_items/${menuItemId}?` + serialize(menuItem))
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("id").eq(menuItemId);
          response.body.should.have.property("category_id").eq(2);
          response.body.should.have.property("title").eq("Desert Second Edit");
          response.body.should.have
            .property("description")
            .eq("This menu item has been edited three times");
          response.body.should.have.property("calories").eq("472");
          response.body.should.have.property("price").eq("799");
          response.body.should.have.property("deleted").eq(false);
          done();
        });
    });

    it("It should NOT PUT a menu item with incorrect ID", (done) => {
      menuItemId = 0;
      const menuItem = {
        price: 799,
      };
      chai
        .request(api)
        .put(`/menu_items/${menuItemId}?` + serialize(menuItem))
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a("object");
          response.body.should.have.property("error").eq("MenuItemNotUpdated");
          done();
        });
    });
  });

  /**
   * Test the DELETE route
   */
  describe("DELETE /menu_items/:menuItemId", () => {
    it("It should DELETE an existing menu item", (done) => {
      menuItemId = 1;
      chai
        .request(api)
        .delete(`/menu_items/${menuItemId}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("id").eq(menuItemId);
          response.body.should.have.property("deleted").eq(true);
          done();
        });
    });

    it("It should NOT DELETE a menu item with incorrect ID", (done) => {
      menuItemId = 0;
      chai
        .request(api)
        .delete(`/menu_items/${menuItemId}`)
        .end((err, response) => {
          response.should.have.status(404);
          response.body.should.be.a("object");
          response.body.should.have.property("error").eq("MenuItemNotFound");
          done();
        });
    });
  });
});
