const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'mbn9d9',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://api.escuelajs.co",
    failOnStatusCode: false,
    
    env: {
      requestMode: true
    }
    
  },
});
