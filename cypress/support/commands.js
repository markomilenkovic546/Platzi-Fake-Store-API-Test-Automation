// Create profile
Cypress.Commands.add("createProfile", () => {
  const postRequestBody = {
    name: Math.random().toString(5).substring(2),
    email: Math.random().toString(5).substring(2) + "@gmail.com",
    password: "12345",
    avatar: "https://api.lorem.space/image/face?w=640&h=480&r=867",
  };
  // Create a profile
  cy.request({
    method: "POST",
    url: "/api/v1/users/",
    body: postRequestBody,
    failOnStatusCode: false,
  });
});


Cypress.Commands.add("login", (email, name) => {
    const loginPostRequestBody = {
          email: email,
          name: name
        };
        // Login to account
        cy.request({
          method: "POST",
          url: "/api/v1/auth/login/",
          body: loginPostRequestBody,
          failOnStatusCode: false,
        })
  });
  