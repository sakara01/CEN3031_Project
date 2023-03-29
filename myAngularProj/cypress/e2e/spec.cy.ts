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

describe('Test Saved Favs', () => {
  it('Checks Favs After Login', () => {
    cy.visit('http://localhost:4200/')

    cy.get('#loginButton').click()

    cy.get('#nameGiven').click()
    cy.get('#nameGiven').type('urmom')

    cy.get('#passGiven').type('urmom')
    
    cy.get('#submitBtnHolder').click()

    //sometimes fails bc the favs button is not loaded quick enough
    //wait until its loaded
    cy.wait(500)
    cy.get('#showFavs').click()
  })
})