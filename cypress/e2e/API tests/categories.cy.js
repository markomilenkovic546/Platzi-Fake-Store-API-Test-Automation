const tv4 = require("tv4");

// Get all categories
describe('Tests which cover "GET, /api/v1/categories" request ', function () {
  it("Response status code should be equal 200", function () {
    // Verify that reponse status is equal 200
    cy.request("GET", "/api/v1/categories").its("status").should("equal", 200);
  });

  it("Should validate the actual response against the schema", () => {
    // Send a GET request to the specified endpoint
    cy.request("GET", "/api/v1/categories").then((response) => {
      // Load the schema from the fixture file
      cy.fixture("categories/get-categories-schema.json").then((schema) => {
        // Validate the response body against the schema
        const isValid = tv4.validate(response.body, schema);
        expect(isValid).to.be.true;
      });
    });
  });
});

// Get a single category
describe('Tests which cover "GET, /api/v1/categories/{id}" request ', function () {
  it("Response status code should be equal 200", function () {
    // Verify that reponse status is equal 200
    cy.request("GET", "/api/v1/categories/1").its("status").should("equal", 200);
  });

  it("Response body should contain only category with id 1", function () {
    // Verify that reponse status is equal 200
    cy.request("GET", "/api/v1/categories/1").then((response) => {
      expect(response.body.id).to.be.eq(1);
    });
  });

  it("Should validate the actual response against the schema", () => {
    // Send a GET request to the specified endpoint
    cy.request("GET", "/api/v1/categories").then((response) => {
      // Load the schema from the fixture file
      cy.fixture("categories/get-categories-schema.json").then((schema) => {
        // Validate the response body against the schema
        const isValid = tv4.validate(response.body, schema);
        expect(isValid).to.be.true;
      });
    });
  });
});

// Create a category
describe('Tests which cover "POST, /api/v1/categories/" request ', function () {
  it("Status code should be 201 and response body should be correct when valid structure is posted", function () {
    cy.fixture("categories/post-category-correct-request-body.json").then((data) => {
      const requestBody = data;
      cy.request({
        method: "POST",
        url: "/api/v1/categories/",
        body: requestBody,
      }).then((response) => {
        // Verify that status code and response body are correct
        expect(response.status).to.eq(201);
        expect(response.body.name).to.deep.equal(data.name);
        expect(response.body.image).to.deep.equal(data.image);
      });
    });
  });

  it("Should validate the actual response against the schema", function () {
    cy.fixture("categories/post-category-correct-request-body.json").then((data) => {
      const requestBody = data;
      cy.request({
        method: "POST",
        url: "/api/v1/categories/",
        body: requestBody,
      }).then((response) => {
        cy.fixture("categories/post-category-correct-request-body.json").then((schema) => {
          // Validate the response body against the schema
          const isValid = tv4.validate(response.body, schema);
          expect(isValid).to.be.true;
        });
      });
    });
  });

  // Negative test cases
  it("Status code should be 400 when number type is sent for 'name' property", function () {
    const requestBody = {
      name: 124,
      image: "https://img.com",
    };
    cy.request({
      method: "POST",
      url: "/api/v1/categories/",
      body: requestBody,
      failOnStatusCode: false,
    }).then((response) => {
      // Verify that status code is 400 and message is appropriate
      expect(response.status).to.eq(400);
      expect(response.body.message[0]).to.deep.equal("name must be a string");
    });
  });

  it("Status code should be 400 when array type is sent for 'name' property", function () {
    const requestBody = {
      name: ["New Category"],
      image: "https://img.com",
    };
    cy.request({
      method: "POST",
      url: "/api/v1/categories/",
      body: requestBody,
      failOnStatusCode: false,
    }).then((response) => {
      // Verify that status code is 400 and message is appropriate
      expect(response.status).to.eq(400);
      expect(response.body.message[0]).to.deep.equal("name must be a string");
    });
  });

  it("Status code should be 400 when number type is sent for 'image' property", function () {
    const requestBody = {
      name: "New Category",
      image: 124,
    };
    cy.request({
      method: "POST",
      url: "/api/v1/categories/",
      body: requestBody,
      failOnStatusCode: false,
    }).then((response) => {
      // Verify that status code is 400 and message is appropriate
      expect(response.status).to.eq(400);
      expect(response.body.message[0]).to.deep.equal("image must be a URL address");
    });
  });

  it("Status code should be 400 when string is not url for 'image' property", function () {
    const requestBody = {
      name: "New Category",
      image: "img",
    };
    cy.request({
      method: "POST",
      url: "/api/v1/categories/",
      body: requestBody,
      failOnStatusCode: false,
    }).then((response) => {
      // Verify that status code is 400 and message is appropriate
      expect(response.status).to.eq(400);
      expect(response.body.message[0]).to.deep.equal("image must be a URL address");
    });
  });
});

// Update a category
describe('Tests which cover "PUT, /api/v1/categories/{id}" request ', function () {
  it("Status code should be 200 and name successfully updated", function () {
    const requestBody = {
      name: "Change title",
    };
    cy.request({
      method: "PUT",
      url: "/api/v1/categories/1",
      body: requestBody,
    }).then((response) => {
      // Verify that status code and response body are correct
      expect(response.status).to.eq(200);
      expect(response.body.name).to.deep.equal("Change title");
    });
  });

  it("Status code should be 200 and image successfully updated", function () {
    const requestBody = {
      image: "https://img.com",
    };
    cy.request({
      method: "PUT",
      url: "/api/v1/categories/1",
      body: requestBody,
    }).then((response) => {
      // Verify that status code and response body are correct
      expect(response.status).to.eq(200);
      expect(response.body.image).to.deep.equal("https://img.com");
    });
  });

  it("Should validate the actual response against the schema", function () {
    const requestBody = {
      image: "https://img.com",
    };
    cy.request({
      method: "PUT",
      url: "/api/v1/categories/1",
      body: requestBody,
    }).then((response) => {
      cy.fixture("categories/update-category-schema.json").then((schema) => {
        // Validate the response body against the schema
        const isValid = tv4.validate(response.body, schema);
        expect(isValid).to.be.true;
      });
    });
  });
});

// Get all categories
describe('Tests which cover "GET, /api/v1/categories" request ', function () {
  it("Response status code should be equal 200", function () {
    // Verify that reponse status is equal 200
    cy.request("GET", "/api/v1/categories").its("status").should("equal", 200);
  });

  it("Should validate the actual response against the schema", () => {
    // Send a GET request to the specified endpoint
    cy.request("GET", "/api/v1/categories").then((response) => {
      // Load the schema from the fixture file
      cy.fixture("categories/get-categories-schema.json").then((schema) => {
        // Validate the response body against the schema
        const isValid = tv4.validate(response.body, schema);
        expect(isValid).to.be.true;
      });
    });
  });
});

// Delete category
describe('Tests which cover "DELETE, /api/v1/categories/{id}" request ', function () {
  it("Response status code should be equal 200", function () {
    // Verify that reponse status is equal 200
    cy.request("DELETE", "/api/v1/categories/2").its("status").should("equal", 200);
  });

  it.skip("Should successfully delete category", function () {
    // Verify that reponse status is equal 200
    cy.request("DELETE", "/api/v1/categories/3").then((response) => {
      expect(response.body).to.be.eq(true);
    });
  });
});

// Get all products by category
describe('Tests which cover "GET, /api/v1/categories/1/products" request ', function () {
  it("Response status code should be equal 200", function () {
    // Verify that reponse status is equal 200
    cy.request("GET", "/api/v1/categories/1/products").its("status").should("equal", 200);
  });

  it("Response body should contains only products with correct category id", function () {
    // Verify that reponse status is equal 200
    cy.request("GET", "/api/v1/categories/1/products").then((response) => {
      let unexpectedProducts = [];
      response.body.forEach(function (product) {
        if (product.category.id != 1) {
          unexpectedProducts.push(product.id);
        }
      });

      if (unexpectedProducts.length > 0) {
        console.log("Unexpected product IDs: " + unexpectedProducts);

        expect(unexpectedProducts.length).to.eql(0);
      } else {
        expect(true).to.be.true;
      }
    });
  });

  it("Response body should contains only products with correct category id when limit & offset are set", function () {
    // Verify that reponse status is equal 200
    cy.request("GET", "/api/v1/categories/1/products?limit=10&offset=10").then((response) => {
      let unexpectedProducts = [];
      response.body.forEach(function (product) {
        if (product.category.id != 1) {
          unexpectedProducts.push(product.id);
        }
      });

      if (unexpectedProducts.length > 0) {
        console.log("Unexpected product IDs: " + unexpectedProducts);

        expect(unexpectedProducts.length).to.eql(0);
      } else {
        expect(true).to.be.true;
        expect(response.body.length).to.be.eq(10);
      }
    });
  });

  it("Should validate the actual response against the schema", () => {
    // Send a GET request to the specified endpoint
    cy.request("GET", "/api/v1/categories/1/products").then((response) => {
      // Load the schema from the fixture file
      cy.fixture("products/get-products-schema.json").then((schema) => {
        // Validate the response body against the schema
        const isValid = tv4.validate(response.body, schema);
        expect(isValid).to.be.true;
      });
    });
  });
});
