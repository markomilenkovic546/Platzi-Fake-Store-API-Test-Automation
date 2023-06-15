const tv4 = require("tv4");

// Get all users
describe('Tests which cover "GET, /api/v1/users" request ', function () {
  it("Response status code should be equal 200", function () {
    // Verify that reponse status is equal 200
    cy.request("GET", "/api/v1/categories").its("status").should("equal", 200);
  });

  it("Should validate the actual response against the schema", () => {
    // Send a GET request to the specified endpoint
    cy.request("GET", "/api/v1/users").then((response) => {
      // Load the schema from the fixture file
      cy.fixture("users/get-users-schema.json").then((schema) => {
        // Validate the response body against the schema
        const isValid = tv4.validate(response.body, schema);
        expect(isValid).to.be.true;
      });
    });
  });
});

// Get a single user
describe('Tests which cover "GET, /api/v1/users/{id}" request ', function () {
  it("Response status code should be equal 200", function () {
    // Verify that reponse status is equal 200
    cy.request("GET", "/api/v1/users/1").its("status").should("equal", 200);
  });

  it("Should validate the actual response against the schema", () => {
    // Send a GET request to the specified endpoint
    cy.request("GET", "/api/v1/users/1").then((response) => {
      // Load the schema from the fixture file
      cy.fixture("users/get-single-user-schema.json").then((schema) => {
        // Validate the response body against the schema
        const isValid = tv4.validate(response.body, schema);
        expect(isValid).to.be.true;
      });
    });
  });
});

// Create a user
describe('Tests which cover "POST, /api/v1/users/" request ', function () {
  it("Status code should be 201 and response body should be correct when valid structure is posted", function () {
    const requestBody = {
      name: Math.random().toString(5).substring(2),
      email: Math.random().toString(5).substring(2) + "@gmail.com",
      password: "1234",
      avatar: "https://api.lorem.space/image/face?w=640&h=480&r=867",
    };
    cy.request({
      method: "POST",
      url: "/api/v1/users/",
      body: requestBody,
      failOnStatusCode: false,
    }).then((response) => {
      // Verify that status code and response body are correct
      expect(response.status).to.eq(201);
      expect(response.body.name).to.deep.equal(requestBody.name);
      expect(response.body.email).to.deep.equal(requestBody.email);
      expect(response.body.password).to.deep.equal(requestBody.password);
      expect(response.body.avatar).to.deep.equal(requestBody.avatar);
    });
  });

  it("Should validate the actual response against the schema", function () {
    cy.fixture("categories/post-category-correct-request-body.json").then((data) => {
      const requestBody = {
        name: Math.random().toString(5).substring(2),
        email: Math.random().toString(5).substring(2) + "@gmail.com",
        password: "1234",
        avatar: "https://api.lorem.space/image/face?w=640&h=480&r=867",
      };
      cy.request({
        method: "POST",
        url: "/api/v1/users/",
        body: requestBody,
        failOnStatusCode: false,
      }).then((response) => {
        cy.fixture("users/post-user-schema.json").then((schema) => {
          // Validate the response body against the schema
          const isValid = tv4.validate(response.body, schema);
          expect(isValid).to.be.true;
        });
      });
    });
  });
  // Negative test cases
  it("Status code should be 400 if inccorect email format is sent", function () {
    const requestBody = {
      name: Math.random().toString(5).substring(2),
      email: Math.random().toString(5).substring(2) + "@@gmail.com",
      password: "12345",
      avatar: "https://api.lorem.space/image/face?w=640&h=480&r=867",
    };
    cy.request({
      method: "POST",
      url: "/api/v1/users/",
      body: requestBody,
      failOnStatusCode: false,
    }).then((response) => {
      // Verify that status code and response body are correct
      expect(response.status).to.eq(400);
      expect(response.body.message[0]).to.deep.equal("email must be an email");
    });
  });

  it("Status code should be 400 if the 'name' is sent as a number type", function () {
    const requestBody = {
      name: 1345,
      email: Math.random().toString(5).substring(2) + "@gmail.com",
      password: "12345",
      avatar: "https://api.lorem.space/image/face?w=640&h=480&r=867",
    };
    cy.request({
      method: "POST",
      url: "/api/v1/users/",
      body: requestBody,
      failOnStatusCode: false,
    }).then((response) => {
      // Verify that status code and response body are correct
      expect(response.status).to.eq(400);
      expect(response.body.message[0]).to.deep.equal("name must be a string");
    });
  });

  it("Status code should be 400 if the name is sent as an array type", function () {
    const requestBody = {
      name: ["Name"],
      email: Math.random().toString(5).substring(2) + "@gmail.com",
      password: "12345",
      avatar: "https://api.lorem.space/image/face?w=640&h=480&r=867",
    };
    cy.request({
      method: "POST",
      url: "/api/v1/users/",
      body: requestBody,
      failOnStatusCode: false,
    }).then((response) => {
      // Verify that status code and response body are correct
      expect(response.status).to.eq(400);
      expect(response.body.message[0]).to.deep.equal("name must be a string");
    });
  });

  it("Status code should be 400 if password is sent as a number type'", function () {
    const requestBody = {
      name: "Name",
      email: Math.random().toString(5).substring(2) + "@gmail.com",
      password: 12345,
      avatar: "https://api.lorem.space/image/face?w=640&h=480&r=867",
    };
    cy.request({
      method: "POST",
      url: "/api/v1/users/",
      body: requestBody,
      failOnStatusCode: false,
    }).then((response) => {
      // Verify that status code and response body are correct
      expect(response.status).to.eq(400);
      expect(response.body.message[0]).to.deep.equal("password must be a string");
    });
  });

  it("Status code should be 400 if a sent password is shorter than 4 characters", function () {
    const requestBody = {
      name: "Name",
      email: Math.random().toString(5).substring(2) + "@gmail.com",
      password: "123",
      avatar: "https://api.lorem.space/image/face?w=640&h=480&r=867",
    };
    cy.request({
      method: "POST",
      url: "/api/v1/users/",
      body: requestBody,
      failOnStatusCode: false,
    }).then((response) => {
      // Verify that status code and response body are correct
      expect(response.status).to.eq(400);
      expect(response.body.message[0]).to.deep.equal("password must be longer than or equal to 4 characters");
    });
  });

  it("Status code should be 400 if the password is sent as an array type", function () {
    const requestBody = {
      name: Math.random().toString(5).substring(2),
      email: Math.random().toString(5).substring(2) + "@gmail.com",
      password: [12345],
      avatar: "https://api.lorem.space/image/face?w=640&h=480&r=867",
    };
    cy.request({
      method: "POST",
      url: "/api/v1/users/",
      body: requestBody,
      failOnStatusCode: false,
    }).then((response) => {
      // Verify that status code and response body are correct
      expect(response.status).to.eq(400);
    });
  });

  it("Status code should be 400 if the sent avatar string is not url'", function () {
    const requestBody = {
      name: Math.random().toString(5).substring(2),
      email: Math.random().toString(5).substring(2) + "@gmail.com",
      password: "1234",
      avatar: "img",
    };
    cy.request({
      method: "POST",
      url: "/api/v1/users/",
      body: requestBody,
      failOnStatusCode: false,
    }).then((response) => {
      // Verify that status code and response body are correct
      expect(response.status).to.eq(400);
      expect(response.body.message[0]).to.deep.equal("avatar must be a URL address");
    });
  });
});

// Update a user
describe('Tests which cover "PUT, /api/v1/users/{id}" request ', function () {
  it.only("Response status code should be equal 200'", function () {
    const postRequestBody = {
      name: 1345,
      email: Math.random().toString(5).substring(2) + "@gmail.com",
      password: "12345",
      avatar: "https://api.lorem.space/image/face?w=640&h=480&r=867",
    };
    cy.request({
      method: "POST",
      url: "/api/v1/users/",
      body: postRequestBody,
      failOnStatusCode: false,
    }).then((response) => {
      const id = response.body.id;
      const putRequestBody = {
        name: Math.random().toString(5).substring(2),
        email: Math.random().toString(5).substring(2) + "@gmail.com",
      };
      cy.request({
        method: "PUT",
        url: `/api/v1/users/${id}`,
        body: putRequestBody,
        failOnStatusCode: false,
      }).then((response) => {
        // Verify that status code is correct
        expect(response.status).to.eq(200);
      });
    });
  });

  it.only("Name and email should be successfully updated", function () {
    const postRequestBody = {
      name: 1345,
      email: Math.random().toString(5).substring(2) + "@gmail.com",
      password: "12345",
      avatar: "https://api.lorem.space/image/face?w=640&h=480&r=867",
    };
    cy.request({
      method: "POST",
      url: "/api/v1/users/",
      body: postRequestBody,
      failOnStatusCode: false,
    }).then((response) => {
      const id = response.body.id;
      const putRequestBody = {
        name: Math.random().toString(5).substring(2),
        email: Math.random().toString(5).substring(2) + "@gmail.com",
      };
      cy.request({
        method: "PUT",
        url: `/api/v1/users/${id}`,
        body: putRequestBody,
        failOnStatusCode: false,
      }).then((response) => {
        // Verify that  name and email are successfully updated
        expect(response.body.name).to.deep.equal(putRequestBody.name);
        expect(response.body.email).to.deep.equal(putRequestBody.email);
      });
    });
  });

  it.only("Should validate the actual response against the schema", function () {
    cy.fixture("categories/post-category-correct-request-body.json").then((data) => {
      const postRequestBody = {
        name: 1345,
        email: Math.random().toString(5).substring(2) + "@gmail.com",
        password: "12345",
        avatar: "https://api.lorem.space/image/face?w=640&h=480&r=867",
      };
      cy.request({
        method: "POST",
        url: "/api/v1/users/",
        body: postRequestBody,
        failOnStatusCode: false,
      }).then((response) => {
        const id = response.body.id;
        const putRequestBody = {
          name: Math.random().toString(5).substring(2),
          email: Math.random().toString(5).substring(2) + "@gmail.com",
        };
        cy.request({
          method: "PUT",
          url: `/api/v1/users/${id}`,
          body: putRequestBody,
          failOnStatusCode: false,
        }).then((response) => {
          cy.fixture("users/post-user-schema.json").then((schema) => {
            // Validate the response body against the schema
            const isValid = tv4.validate(response.body, schema);
            expect(isValid).to.be.true;
          });
        });
      });
    });
  });

  it("Status code should be 400 if a 'name' is sent as a number type", function () {
    const requestBody = {
      name: Math.random(),
      email: Math.random().toString(5).substring(2) + "@gmail.com",
    };
    cy.request({
      method: "PUT",
      url: "/api/v1/users/49",
      body: requestBody,
      failOnStatusCode: false,
    }).then((response) => {
      // Verify that status code is correct
      expect(response.status).to.eq(400);
      expect(response.body.message[0]).to.deep.equal("name must be a string");
    });
  });

  it("Status code should be 400 if a 'name' is sent as an array", function () {
    const requestBody = {
      name: [12345],
      email: Math.random().toString(5).substring(2) + "@gmail.com",
    };
    cy.request({
      method: "PUT",
      url: "/api/v1/users/49",
      body: requestBody,
      failOnStatusCode: false,
    }).then((response) => {
      // Verify that status code is correct
      expect(response.status).to.eq(400);
      expect(response.body.message[0]).to.deep.equal("name must be a string");
    });
  });

  it("Status code should be 400 if an 'email' is sent in incorrect format", function () {
    const requestBody = {
      name: Math.random().toString(5).substring(2),
      email: Math.random().toString(5).substring(2),
    };
    cy.request({
      method: "PUT",
      url: "/api/v1/users/49",
      body: requestBody,
      failOnStatusCode: false,
    }).then((response) => {
      // Verify that status code is correct
      expect(response.status).to.eq(400);
      expect(response.body.message[0]).to.deep.equal("email must be an email");
    });
  });
});

describe('Tests which cover "DELETE, /api/v1/users/{id}" request ', function () {
  it.only("User should be successfully deleted", function () {
    const postRequestBody = {
      name: 1345,
      email: Math.random().toString(5).substring(2) + "@gmail.com",
      password: "12345",
      avatar: "https://api.lorem.space/image/face?w=640&h=480&r=867",
    };
    cy.request({
      method: "POST",
      url: "/api/v1/users/",
      body: postRequestBody,
      failOnStatusCode: false,
    }).then((response) => {
      const id = response.body.id;
      const deleteRequestBody = {
        name: Math.random().toString(5).substring(2),
        email: Math.random().toString(5).substring(2) + "@gmail.com",
      };
      cy.request({
        method: "DELETE",
        url: `/api/v1/users/${id}`,
        body: deleteRequestBody,
        failOnStatusCode: false,
      }).then((response) => {
        // Verify that  user us successfully deleted
        expect(response.status).to.eq(200);
        expect(response.body).to.deep.equal(true);
      });
    });
  });
});

describe('Tests which cover "POST, /api/v1/users/is-available" request ', function () {
  it.only("Response status code should be equal 200'", function () {
    const postRequestBody = {
      name: 1345,
      email: Math.random().toString(5).substring(2) + "@gmail.com",
      password: "12345",
      avatar: "https://api.lorem.space/image/face?w=640&h=480&r=867",
    };
    cy.request({
      method: "POST",
      url: "/api/v1/users/",
      body: postRequestBody,
      failOnStatusCode: false,
    }).then((response) => {
      const id = response.body.id;
      const isItAvalaiableRequestBody = {
        email: postRequestBody.email,
      };
      cy.request({
        method: "POST",
        url: `/api/v1/users/is-available`,
        body: isItAvalaiableRequestBody,
        failOnStatusCode: false,
      }).then((response) => {
        // Verify that status code is correct
        expect(response.status).to.eq(201);
        expect(response.body.isAvailable).to.be.deep.equal(false);
      });
    });
  });
});
