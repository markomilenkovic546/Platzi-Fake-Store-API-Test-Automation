


describe('Tests which cover "/products" endpoint ', function (){

it('get products', function() {
 
    cy.request('GET', '/api/v1/products').its('status').should('equal', 200)
        

})





})