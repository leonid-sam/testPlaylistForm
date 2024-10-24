const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      config.env.BASE_URL = process.env.BASE_URL;
      return config;
    }
  }
};

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

