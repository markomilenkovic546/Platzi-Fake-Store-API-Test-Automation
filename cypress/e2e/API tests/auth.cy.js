const tv4 = require("tv4");

// Login to account
describe('Tests which cover "POST, /api/v1/auth/login" request ', function () {
  it.only("Response status code should be equal 201'", function () {
    // Create profile
    cy.createProfile().then((response) => {
      const loginPostRequestBody = {
        email: response.body.email,
        name: response.body.name,
      };

      // Login to profile
      cy.request({
        method: "POST",
        url: "/api/v1/auth/login/",
        body: loginPostRequestBody,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(201);
      });
    });
  });

  it.only("Should validate the actual response against the schema'", function () {
    cy.createProfile().then((response) => {
      const loginPostRequestBody = {
        email: response.body.email,
        name: response.body.name,
      };
      // Login to profile
      cy.request({
        method: "POST",
        url: "/api/v1/auth/login/",
        body: loginPostRequestBody,
        failOnStatusCode: false,
      }).then((response) => {
        cy.fixture("auth/login-response-schema.json").then((schema) => {
          // Validate the response body against the schema
          const isValid = tv4.validate(response.body, schema);
          expect(isValid).to.be.true;
        });
      });
    });
  });

  // Get user with session
  describe('Tests which cover "GET, /api/v1/auth/profile" request ', function () {
    it.only("Should validate the actual response against the schema'", function () {
      cy.createProfile().then((response) => {
        // Login to profile
        cy.login(response.body.email, response.body.name).then((response) => {
          const access_token = response.body.access_token;
          // Get user with session
          cy.request({
            method: "GET",
            url: "/api/v1/auth/profile",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${access_token}`,
            },
            failOnStatusCode: false,
          }).then((response) => {
            cy.fixture("auth/get-user-schema.json").then((schema) => {
              // Validate the response body against the schema
              const isValid = tv4.validate(response.body, schema);
              expect(isValid).to.be.true;
            });
          });
        });
      });
    });
  });

  it.only("Should validate the actual response against the schema'", function () {
    cy.createProfile().then((response) => {
      // Login to profile
      cy.login(response.body.email, response.body.name).then((response) => {
        const access_token = response.body.access_token;
        // Get user with session
        cy.request({
          method: "GET",
          url: "/api/v1/auth/profile",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.body.email).to.be.eq(loginPostRequestBody.email);
          expect(response.body.name).to.be.eq(loginPostRequestBody.name);
        });
      });
    });
  });
});

// Get a new Access Token with a Refresh Token
describe('Tests which cover "POST, /api/v1/auth/refresh-token" request ', function () {
  it.only("Should validate the actual response against the schema'", function () {
    cy.createProfile().then((response) => {
      // Login to profile
      cy.login(response.body.email, response.body.name).then((response) => {
        const refresh_token = response.body.refresh_token;
        const postRequestBody = {
          refreshToken: `${refresh_token}`,
        };
        // Get access token by posting refresh token
        cy.request({
          method: "POST",
          url: "/api/v1/auth/refresh-token",
          body: postRequestBody,
          failOnStatusCode: false,
        }).then((response) => {
          expect(typeof response.body.access_token).to.equal("string");
          expect(typeof response.body.refresh_token).to.equal("string");
        });
      });
    });
  });
});
