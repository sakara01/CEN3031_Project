describe('Test Login', () => {
  it('Logs in to Account', () => {
    cy.visit('http://localhost:4200/')

    cy.get('#searchBtn').click()

    cy.get('#loginButton').click()

    cy.get('#nameGiven').click()
    cy.get('#nameGiven').type('User123')

    cy.get('#passGiven').click()
    cy.get('#passGiven').type('password123')

    cy.get('#submitBtn').click()
    cy.get('#createAcct').click()
    cy.get('#closeBtn').click()
  })
})