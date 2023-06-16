# Platzi-Fake-Store-API-Test-Automation

This repository contains Cypress API tests for testing the "Platzi Fake Store API".

API documentation: https://fakeapi.platzi.com/en/rest/introduction

## Test Framework Structure

The test framework is organized in the following way:

- The spec files are located in the `cypress/e2e/API tests` directory.
- Test suite files are organized according to the following endpoint groups:
  - Products
  - Filter Products
  - Categories
  - Users
  - Auth

- Test data, including JSON schemas, are located in the `fixtures` folder.
- The `tv4` library is used to validate the response body against the defined JSON schemas.

## Available Scripts

In this project, you can use the following scripts:

- To run Cypress in GUI mode: `npx cypress open`
- To run all tests in headless mode: `npm run tests`
- To run individual test suites/spec files:
  - `npm run auth`
  - `npm run categories`
  - `npm run filter-products`
  - `npm run products`
  - `npm run users`

Make sure you have the necessary dependencies installed before running the tests. You can install the dependencies by running `npm install`.
