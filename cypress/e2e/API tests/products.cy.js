const tv4 = require('tv4');


describe('Tests which cover "GET, /api/v1/products" request ', function () {

    it('Response status should be equal 200', function () {

        // Verify that reponse status is equal 200
        cy.request('GET', '/api/v1/products').its('status').should('equal', 200)
    })

    it('Should validate the actual response against the schema', () => {
        // Send a GET request to the specified endpoint
        cy.request('GET', '/api/v1/products').then((response) => {
            // Load the schema from the fixture file
            cy.fixture('get-products-schema.json').then((schema) => {
                // Validate the response body against the schema
                const isValid = tv4.validate(response.body, schema);
                expect(isValid).to.be.true;
            });
        });
    });


    it('Response status should be equal 200 when limit & offset are set ', function () {

        // Verify that reponse status is equal 200
        cy.request('GET', '/api/v1/products?limit=5&offset=0').its('status').should('equal', 200)
    })


    it('Should validate the actual response against the schema when limit & offset are set', () => {
        // Send a GET request to the specified endpoint with limit and offset parameters
        cy.request('GET', '/api/v1/products?limit=5&offset=0').then((response) => {
            // Load the schema from the fixture file
            cy.fixture('get-products-schema.json').then((schema) => {
                // Validate the response body against the schema
                const isValid = tv4.validate(response.body, schema);
                expect(isValid).to.be.true;
            });
        });
    });


    it('Response body should contain correct number of products according to limit', () => {
        // Send a GET request to the specified endpoint with limit and offset parameters
        cy.request('GET', '/api/v1/products?limit=5&offset=0').then((response) => {
            // Verify that that response body contains correct number of products according to limit
            cy.wrap(response.body)
                .its('length')
                .should('eq', 5);
        });
    });




    it('Response body should be corerct according to set limit & offset', function () {
        // Fetch all products and store first 5 products in the expectedResponseBody array
        cy.request('GET', '/api/v1/products').then((response) => {
            cy.wrap(response.body).then((body) => {
                const startIndex = 0;
                const endIndex = 5;
                const expectedResponseBody = body.slice(startIndex, endIndex);
                console.log(expectedResponseBody)
                // Fetch products with limit and offset set
                cy.request('GET', '/api/v1/products?limit=5&offset=0').then((response) => {
                    cy.wrap(response.body).then((actualResponseBody) => {
                        // Verify that actual response body is equal to expected response body
                        expect(actualResponseBody).to.deep.equal(expectedResponseBody);
                    })
                })

            })

        })
    })

})