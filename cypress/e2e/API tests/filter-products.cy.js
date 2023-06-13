const tv4 = require("tv4");

// Filter products by title
describe('Tests which cover "GET, /api/v1/products/?title=Generic request" ', function () {
  it("Response status code should be equal 200", function () {
    // Verify that reponse status is equal 200
    cy.request("GET", "/api/v1/products/?title=Generic").its("status").should("equal", 200);
  });

  it("Should validate the actual response against the schema", () => {
    // Send a GET request to the specified endpoint
    cy.request("GET", "/api/v1/products/?title=Generic").then((response) => {
      // Load the schema from the fixture file
      cy.fixture("products/get-products-schema.json").then((schema) => {
        // Validate the response body against the schema
        const isValid = tv4.validate(response.body, schema);
        expect(isValid).to.be.true;
      });
    });
  });

  it("Response should contain only products according to title query parameter", function () {
    cy.request("GET", "/api/v1/products/?title=Generic request").then((response) => {
      let unexpectedProducts = [];
      response.body.forEach(function (product) {
        if (!product.title.includes("Generic")) {
          unexpectedProducts.push(product.id);
        }
      });

      if (unexpectedProducts.length > 0) {
        console.log("Failed products IDs: " + unexpectedProducts);

        expect(unexpectedProducts.length).to.eql(0);
      } else {
        expect(true).to.be.true;
      }
    });
  });
});

// Filter products by price
describe('Tests which cover "GET, /api/v1/products/price=100" ', function () {
  it("Response status code should be equal 200", function () {
    // Verify that reponse status is equal 200
    cy.request("GET", "/api/v1/products/price=100").its("status").should("equal", 200);
  });

  it("Should validate the actual response against the schema", () => {
    // Send a GET request to the specified endpoint
    cy.request("GET", "/api/v1/products/price=100").then((response) => {
      // Load the schema from the fixture file
      cy.fixture("products/get-products-schema.json").then((schema) => {
        // Validate the response body against the schema
        const isValid = tv4.validate(response.body, schema);
        expect(isValid).to.be.true;
      });
    });
  });

  it("Response should contain only products in expected price range", function () {
    cy.request("GET", "/api/v1/products/price=100").then((response) => {
      let unexpectedProducts = [];
      response.body.forEach(function (product) {
        if (product.price != 1) {
          unexpectedProducts.push(product.id);
        }
      });

      if (unexpectedProducts.length > 0) {
        console.log("Failed products IDs: " + unexpectedProducts);
        expect(unexpectedProducts.length).to.eql(0);
      } else {
        expect(true).to.be.true;
      }
    });
  });
});

// Filter products by price range
describe('Tests which cover "GET, /api/v1/products/?price_min=500&price_max=550" ', function () {
  it("Response status code should be equal 200", function () {
    // Verify that reponse status is equal 200
    cy.request("GET", "/api/v1/products/?price_min=500&price_max=550").its("status").should("equal", 200);
  });

  it("Should validate the actual response against the schema", () => {
    // Send a GET request to the specified endpoint
    cy.request("GET", "/api/v1/products/?price_min=500&price_max=550").then((response) => {
      // Load the schema from the fixture file
      cy.fixture("products/get-products-schema.json").then((schema) => {
        // Validate the response body against the schema
        const isValid = tv4.validate(response.body, schema);
        expect(isValid).to.be.true;
      });
    });
  });

  it("Response should contain only products in expected price range", function () {
    cy.request("GET", "/api/v1/products/?price_min=500&price_max=550").then((response) => {
      let unexpectedProducts = [];
      response.body.forEach(function (product) {
        if (product.price < 500 || product.price > 550) {
          unexpectedProducts.push(product.id);
        }
      });

      if (unexpectedProducts.length > 0) {
        console.log("Failed products IDs: " + unexpectedProducts);
        expect(unexpectedProducts.length).to.eql(0);
      } else {
        expect(true).to.be.true;
      }
    });
  });
});

// Filter products by category
describe('Tests which cover "GET, /api/v1/products/?categoryId=1" ', function () {
  it("Response status code should be equal 200", function () {
    // Verify that reponse status is equal 200
    cy.request("GET", "/api/v1/products/?categoryId=1").its("status").should("equal", 200);
  });

  it("Should validate the actual response against the schema", () => {
    // Send a GET request to the specified endpoint
    cy.request("GET", "/api/v1/products/?categoryId=1").then((response) => {
      // Load the schema from the fixture file
      cy.fixture("products/get-products-schema.json").then((schema) => {
        // Validate the response body against the schema
        const isValid = tv4.validate(response.body, schema);
        expect(isValid).to.be.true;
      });
    });
  });

  it("Response should contain only products in expected product category", function () {
    cy.request("GET", "/api/v1/products/?categoryId=1").then((response) => {
      let unexpectedProducts = [];
      response.body.forEach(function (product) {
        if (product.category.id != 1) {
          unexpectedProducts.push(product.id);
        }
      });

      if (unexpectedProducts.length > 0) {
        console.log("Failed products IDs: " + unexpectedProducts);
        expect(unexpectedProducts.length).to.eql(0);
      } else {
        expect(true).to.be.true;
      }
    });
  });
});

// Join price range and title filters
describe('Tests which cover "GET, /api/v1/products/?title=Generic&price_min=900&price_max=1000" ', function () {
  it("Response status code should be equal 200", function () {
    // Verify that reponse status is equal 200
    cy.request("GET", "/api/v1/products/?title=Generic&price_min=900&price_max=1000")
      .its("status")
      .should("equal", 200);
  });

  it("Should validate the actual response against the schema", () => {
    // Send a GET request to the specified endpoint
    cy.request("GET", "/api/v1/products/?title=Generic&price_min=900&price_max=1000").then((response) => {
      // Load the schema from the fixture file
      cy.fixture("products/get-products-schema.json").then((schema) => {
        // Validate the response body against the schema
        const isValid = tv4.validate(response.body, schema);
        expect(isValid).to.be.true;
      });
    });
  });

  it("Response should contain only products according to price range and title query parameters", function () {
    cy.request("GET", "/api/v1/products/?title=Generic&price_min=900&price_max=1000").then((response) => {
      let unexpectedProducts = [];
      response.body.forEach(function (product) {
        if (product.price < 900 || product.price > 1000 || !product.title.includes("Generic")) {
          unexpectedProducts.push(product.id);
        }
      });

      if (unexpectedProducts.length > 0) {
        console.log("Failed products IDs: " + unexpectedProducts);

        expect(unexpectedProducts.length).to.eql(0);
      } else {
        expect(true).to.be.true;
      }
    });
  });
});

// Join price range, title and category id filters
describe('Tests which cover "GET, /api/v1/products/?title=Generic&price_min=900&price_max=1000&categoryId=3" ', function () {
  it("Response status code should be equal 200", function () {
    // Verify that reponse status is equal 200
    cy.request("GET", "/api/v1/products/?title=Generic&price_min=900&price_max=1000&categoryId=3")
      .its("status")
      .should("equal", 200);
  });

  it("Should validate the actual response against the schema", () => {
    // Send a GET request to the specified endpoint
    cy.request("GET", "/api/v1/products/?title=Generic&price_min=900&price_max=1000&categoryId=3").then((response) => {
      // Load the schema from the fixture file
      cy.fixture("products/get-products-schema.json").then((schema) => {
        // Validate the response body against the schema
        const isValid = tv4.validate(response.body, schema);
        expect(isValid).to.be.true;
      });
    });
  });

  it("Response should contain only products according to price range, title and category id query parameters", function () {
    cy.request("GET", "/api/v1/products/?title=Generic&price_min=900&price_max=1000&categoryId=3").then((response) => {
      let unexpectedProducts = [];
      response.body.forEach(function (product) {
        if (
          product.price < 900 ||
          product.price > 1000 ||
          !product.title.includes("Generic") ||
          product.category.id != 3
        ) {
          unexpectedProducts.push(product.id);
        }
      });

      if (unexpectedProducts.length > 0) {
        console.log("Failed products IDs: " + unexpectedProducts);

        expect(unexpectedProducts.length).to.eql(0);
      } else {
        expect(true).to.be.true;
      }
    });
  });
});

// Join price range and category id filters
describe('Tests which cover "GET, /api/v1/products/?price_min=900&price_max=1000&categoryId=3" ', function () {
  it("Response status code should be equal 200", function () {
    // Verify that reponse status is equal 200
    cy.request("GET", "/api/v1/products/?price_min=900&price_max=1000&categoryId=3").its("status").should("equal", 200);
  });

  it("Should validate the actual response against the schema", () => {
    // Send a GET request to the specified endpoint
    cy.request("GET", "/api/v1/products/?price_min=900&price_max=1000&categoryId=3").then((response) => {
      // Load the schema from the fixture file
      cy.fixture("products/get-products-schema.json").then((schema) => {
        // Validate the response body against the schema
        const isValid = tv4.validate(response.body, schema);
        expect(isValid).to.be.true;
      });
    });
  });

  it("Response should contain only products according to price range and category id query parameters", function () {
    cy.request("GET", "/api/v1/products/?price_min=900&price_max=1000&categoryId=3").then((response) => {
      let unexpectedProducts = [];
      response.body.forEach(function (product) {
        if (product.price < 900 || product.price > 1000 || product.category.id != 3) {
          unexpectedProducts.push(product.id);
        }
      });

      if (unexpectedProducts.length > 0) {
        console.log("Failed products IDs: " + unexpectedProducts);

        expect(unexpectedProducts.length).to.eql(0);
      } else {
        expect(true).to.be.true;
      }
    });
  });
});

// Join title and category id filters
describe('Tests which cover "GET, /api/v1/products/?title=Generic&categoryId=3" ', function () {
  it("Response status code should be equal 200", function () {
    // Verify that reponse status is equal 200
    cy.request("GET", "/api/v1/products/?title=Generic&categoryId=3").its("status").should("equal", 200);
  });

  it("Should validate the actual response against the schema", () => {
    // Send a GET request to the specified endpoint
    cy.request("GET", "/api/v1/products/?title=Generic&categoryId=3").then((response) => {
      // Load the schema from the fixture file
      cy.fixture("products/get-products-schema.json").then((schema) => {
        // Validate the response body against the schema
        const isValid = tv4.validate(response.body, schema);
        expect(isValid).to.be.true;
      });
    });
  });

  it("Response should contain only products according to title and category id query parameters", function () {
    cy.request("GET", "/api/v1/products/?title=Generic&categoryId=3").then((response) => {
      let unexpectedProducts = [];
      response.body.forEach(function (product) {
        if (!product.title.includes("Generic") || product.category.id != 3) {
          unexpectedProducts.push(product.id);
        }
      });

      if (unexpectedProducts.length > 0) {
        console.log("Failed products IDs: " + unexpectedProducts);

        expect(unexpectedProducts.length).to.eql(0);
      } else {
        expect(true).to.be.true;
      }
    });
  });
});

// Join price range filter and pagination query parameters
describe('Tests which cover "GET, /api/v1/products/?price_min=100&price_max=1000&offset=10&limit=10 ', function () {
  it("Response status code should be equal 200", function () {
    // Verify that reponse status is equal 200
    cy.request("GET", "/api/v1/products/?price_min=900&price_max=1000&offset=10&limit=10")
      .its("status")
      .should("equal", 200);
  });

  it("Should validate the actual response against the schema", () => {
    // Send a GET request to the specified endpoint
    cy.request("GET", "/api/v1/products/?price_min=100&price_max=1000&offset=10&limit=10").then((response) => {
      // Load the schema from the fixture file
      cy.fixture("products/get-products-schema.json").then((schema) => {
        // Validate the response body against the schema
        const isValid = tv4.validate(response.body, schema);
        expect(isValid).to.be.true;
      });
    });
  });

  it("Response should contain only products according to price range and query parameters", function () {
    cy.request("GET", "/api/v1/products/?price_min=100&price_max=1000&offset=10&limit=10").then((response) => {
      let unexpectedProducts = [];
      response.body.forEach(function (product) {
        if (product.price < 100 || product.price > 1000) {
          unexpectedProducts.push(product.id);
        }
      });

      if (unexpectedProducts.length > 0) {
        console.log("Failed products IDs: " + unexpectedProducts);

        expect(unexpectedProducts.length).to.eql(0);
      } else {
        expect(response.body.length).to.be.eq(10);
      }
    });
  });
});
