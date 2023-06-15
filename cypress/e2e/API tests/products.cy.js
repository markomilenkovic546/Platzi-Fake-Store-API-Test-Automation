const tv4 = require("tv4");

// Get products/Pagination
describe('Tests which cover "GET, /api/v1/products" request ', function () {
  it("Response status code should be equal 200", function () {
    // Verify that reponse status is equal 200
    cy.request("GET", "/api/v1/products").its("status").should("equal", 200);
  });

  it("Should validate the actual response against the schema", () => {
    // Send a GET request to the specified endpoint
    cy.request("GET", "/api/v1/products").then((response) => {
      // Load the schema from the fixture file
      cy.fixture("products/get-products-schema.json").then((schema) => {
        // Validate the response body against the schema
        const isValid = tv4.validate(response.body, schema);
        expect(isValid).to.be.true;
      });
    });
  });

  it("Response status code should be equal 200 when limit & offset are set ", function () {
    // Verify that reponse status is equal 200
    cy.request("GET", "/api/v1/products?limit=5&offset=0").its("status").should("equal", 200);
  });

  it("Should validate the actual response against the schema when limit & offset are set", () => {
    // Send a GET request to the specified endpoint with limit and offset parameters
    cy.request("GET", "/api/v1/products?limit=5&offset=0").then((response) => {
      // Load the schema from the fixture file
      cy.fixture("products/get-products-schema.json").then((schema) => {
        // Validate the response body against the schema
        const isValid = tv4.validate(response.body, schema);
        expect(isValid).to.be.true;
      });
    });
  });

  it("Response body should contain correct number of products according to limit", () => {
    // Send a GET request to the specified endpoint with limit and offset parameters
    cy.request("GET", "/api/v1/products?limit=5&offset=0").then((response) => {
      // Verify that that response body contains correct number of products according to limit
      cy.wrap(response.body).its("length").should("eq", 5);
    });
  });

  it("Response body should be corerct according to set limit & offset", function () {
    // Fetch all products and store first 5 products in the expectedResponseBody array
    cy.request("GET", "/api/v1/products").then((response) => {
      cy.wrap(response.body).then((body) => {
        const startIndex = 0;
        const endIndex = 5;
        const expectedResponseBody = body.slice(startIndex, endIndex);
        console.log(expectedResponseBody);
        // Fetch products with limit and offset set
        cy.request("GET", "/api/v1/products?limit=5&offset=0").then((response) => {
          cy.wrap(response.body).then((actualResponseBody) => {
            // Verify that actual response body is equal to expected response body
            expect(actualResponseBody).to.deep.equal(expectedResponseBody);
          });
        });
      });
    });
  });
});

// Create a product
describe('Tests which cover "POST, /api/v1/products" request ', function () {
  it("Status code should be 201 when valid structure is posted", function () {
    cy.fixture("products/correct-request-body.json").then((data) => {
      const requestBody = data;
      cy.request({
        method: "POST",
        url: "/api/v1/products",
        body: requestBody,
      }).then((response) => {
        // Verify that status code and response body are correct
        expect(response.status).to.eq(201);
        expect(response.body.title).to.deep.equal(data.title);
        expect(response.body.price).to.deep.equal(data.price);
        expect(response.body.description).to.deep.equal(data.description);
        expect(response.body.category.id).to.deep.equal(data.categoryId);
        expect(response.body.images).to.deep.equal(data.images);
      });
    });
  });

  it('Response status should be 400 when sending number type for "title"', function () {
    const requestBody = {
      title: 2,
      price: 10,
      description: "A description",
      categoryId: 1,
      images: ["https://placeimg.com/640/480/any"],
    };
    cy.request({
      method: "POST",
      url: "/api/v1/products",
      body: requestBody,
    }).then((response) => {
      // Verify that status code and response body are correct
      expect(response.status).to.eq(400);
      expect(response.body.message).to.eq("title must be a string");
      expect(response.body.error).to.eq("Bad Request");
    });
  });

  it('Response status should be 400 when sending an array type for "title"', function () {
    const requestBody = {
      title: ["New product"],
      price: 10,
      description: "A description",
      categoryId: 1,
      images: ["https://placeimg.com/640/480/any"],
    };
    cy.request({
      method: "POST",
      url: "/api/v1/products",
      body: requestBody,
      failOnStatusCode: false,
    }).then((response) => {
      // Verify that status code and response body are correct
      expect(response.status).to.eq(400);
      expect(response.body.message[0]).to.deep.equal("title must be a string");
      expect(response.body.error).to.eq("Bad Request");
    });
  });

  it('Response status should be 400 when sending a string type for "price"', function () {
    const requestBody = {
      title: "New Product",
      price: "10",
      description: "A description",
      categoryId: 1,
      images: ["https://placeimg.com/640/480/any"],
    };
    cy.request({
      method: "POST",
      url: "/api/v1/products",
      body: requestBody,
      failOnStatusCode: false,
    }).then((response) => {
      // Verify that status code and response body are correct
      expect(response.status).to.eq(400);
      expect(response.body.message[0]).to.deep.equal("price must be a positive number");
      expect(response.body.error).to.eq("Bad Request");
    });
  });

  it('Response status should be 400 shen sending a negative number for "price"', function () {
    const requestBody = {
      title: "New Product",
      price: -1,
      description: "A description",
      categoryId: 1,
      images: ["https://placeimg.com/640/480/any"],
    };
    cy.request({
      method: "POST",
      url: "/api/v1/products",
      body: requestBody,
      failOnStatusCode: false,
    }).then((response) => {
      // Verify that status code and response body are correct
      expect(response.status).to.eq(400);
      expect(response.body.message[0]).to.deep.equal("price must be a positive number");
      expect(response.body.error).to.eq("Bad Request");
    });
  });

  it('Response status should be 400 When sending a number type for "description"', function () {
    const requestBody = {
      title: "New Product",
      price: 10,
      description: 15,
      categoryId: 1,
      images: ["https://placeimg.com/640/480/any"],
    };
    cy.request({
      method: "POST",
      url: "/api/v1/products",
      body: requestBody,
      failOnStatusCode: false,
    }).then((response) => {
      // Verify that status code and response body are correct
      expect(response.status).to.eq(400);
      expect(response.body.message[0]).to.deep.equal("description must be a string");
      expect(response.body.error).to.eq("Bad Request");
    });
  });

  it('Response status should be 400 when sending an array type for "description"', function () {
    const requestBody = {
      title: "New Product",
      price: 10,
      description: ["description"],
      categoryId: 1,
      images: ["https://placeimg.com/640/480/any"],
    };
    cy.request({
      method: "POST",
      url: "/api/v1/products",
      body: requestBody,
      failOnStatusCode: false,
    }).then((response) => {
      // Verify that status code and response body are correct
      expect(response.status).to.eq(400);
      expect(response.body.message[0]).to.deep.equal("description must be a string");
      expect(response.body.error).to.eq("Bad Request");
    });
  });

  it('Response status should be 400 when sending a string type for "categoryId"', function () {
    const requestBody = {
      title: "New Product",
      price: 10,
      description: "description",
      categoryId: "1",
      images: ["https://placeimg.com/640/480/any"],
    };
    cy.request({
      method: "POST",
      url: "/api/v1/products",
      body: requestBody,
      failOnStatusCode: false,
    }).then((response) => {
      // Verify that status code and response body are correct
      expect(response.status).to.eq(400);
      expect(response.body.message[0]).to.deep.equal(
        "categoryId must be a number conforming to the specified constraints"
      );
      expect(response.body.error).to.eq("Bad Request");
    });
  });

  it('Response status should be 400 when sending an array type for "categoryId"', function () {
    const requestBody = {
      title: "New Product",
      price: 10,
      description: "description",
      categoryId: [1],
      images: ["https://placeimg.com/640/480/any"],
    };
    cy.request({
      method: "POST",
      url: "/api/v1/products",
      body: requestBody,
      failOnStatusCode: false,
    }).then((response) => {
      // Verify that status code and response body are correct
      expect(response.status).to.eq(400);
      expect(response.body.message[0]).to.deep.equal(
        "categoryId must be a number conforming to the specified constraints"
      );
      expect(response.body.error).to.eq("Bad Request");
    });
  });

  it('Response status should be 400 when sending negative number for "categoryId"', function () {
    const requestBody = {
      title: "New Product",
      price: 10,
      description: "description",
      categoryId: -1,
      images: ["https://placeimg.com/640/480/any"],
    };
    cy.request({
      method: "POST",
      url: "/api/v1/products",
      body: requestBody,
      failOnStatusCode: false,
    }).then((response) => {
      // Verify that status code and response body are correct
      expect(response.status).to.eq(400);
      expect(response.body.message).to.deep.equal(
        'Could not find any entity of type "Category" matching: {\n    "id": -1\n}'
      );
    });
  });

  it('Response status should be 400 when not sending img url inside array for "images"', function () {
    const requestBody = {
      title: "New Product",
      price: 10,
      description: "description",
      categoryId: 1,
      images: ["image"],
    };
    cy.request({
      method: "POST",
      url: "/api/v1/products",
      body: requestBody,
      failOnStatusCode: false,
    }).then((response) => {
      // Verify that status code and response body are correct
      expect(response.status).to.eq(400);
      expect(response.body.message[0]).to.deep.equal("each value in images must be a URL address");
      expect(response.body.error).to.eq("Bad Request");
    });
  });

  it("Response status should be 400 when img url as a string instead of array", function () {
    const requestBody = {
      title: "New Product",
      price: 10,
      description: "description",
      categoryId: 1,
      images: "https://placeimg.com/640/480/any",
    };
    cy.request({
      method: "POST",
      url: "/api/v1/products",
      body: requestBody,
      failOnStatusCode: false,
    }).then((response) => {
      // Verify that status code and response body are correct
      expect(response.status).to.eq(400);
      expect(response.body.message[0]).to.deep.equal(
        "images must contain at least 1 elements",
        "images must be an array"
      );
      expect(response.body.error).to.eq("Bad Request");
    });
  });
});

// Get a product by ID
describe('Tests which cover "GET, /api/v1/products/{id}" request ', function () {
  it("Response status code should be equal 200", function () {
    // Verify that reponse status is equal 200
    cy.request("GET", "/api/v1/products/5").its("status").should("equal", 200);
  });

  it("Should validate the actual response against the schema", () => {
    // Send a GET request to the specified endpoint
    cy.request("GET", "/api/v1/products/1").then((response) => {
      // Load the schema from the fixture file
      cy.fixture("products/get-single-product-schema.json").then((schema) => {
        // Validate the response body against the schema
        const isValid = tv4.validate(response.body, schema);
        expect(isValid).to.be.true;
      });
    });
  });
});

// Update a product
describe('Tests which cover "PUT, /api/v1/products/{id}" request ', function () {
  it("Response status should be 200 and product successfully updated", function () {
    const requestBody = {
      title: "Change title",
      price: 100,
    };
    cy.request({
      method: "PUT",
      url: "/api/v1/products/1",
      body: requestBody,
      failOnStatusCode: false,
    }).then((response) => {
      // Verify that status code and response body are correct
      expect(response.status).to.eq(200);
      expect(response.body.title).to.deep.equal("Change title");
      expect(response.body.price).to.eq(100);
    });
  });

  it("Should validate the actual response against the schema", function () {
    const requestBody = {
      title: "Change title",
      price: 100,
    };
    cy.request({
      method: "PUT",
      url: "/api/v1/products/1",
      body: requestBody,
      failOnStatusCode: false,
    }).then((response) => {
      // Load the schema from the fixture file
      cy.fixture("products/update-product-schema.json").then((schema) => {
        // Validate the response body against the schema
        const isValid = tv4.validate(response.body, schema);
        expect(isValid).to.be.true;
      });
    });
  });
});

// Delete a product
describe('Tests which cover "DELETE", /api/v1/products/{id} request ', function () {
  it("Response status code should be equal 200", function () {
    // Verify that reponse status is equal 200
    cy.request("DELETE", "/api/v1/products/1").its("status").should("equal", 200);
  });
});
