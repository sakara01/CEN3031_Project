describe('Test Login & search button', () => {
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

describe('Test Incorrect Login, login & logout', () => {
  it('Logs in to Account', () => {
    cy.visit('http://localhost:4200/')

    cy.get('#searchBtn').click()

    cy.get('#loginButton').click()

    //incorrect user n pass
    cy.get('#nameGiven').click()
    cy.get('#nameGiven').type('urmom')

    cy.get('#passGiven').click()
    cy.get('#passGiven').type('urdad')

    //correct user n pass
    cy.get('#nameGiven').click()
    cy.get('#nameGiven').type('urmom')

    cy.get('#passGiven').click()
    cy.get('#passGiven').type('urmom')

    cy.get('#loginButton').click()

    //logout after logged in
    cy.get('#logout').click()

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

//realized cant test side bar without clicking on the map pins
// describe('Test Add Favs', () => {
//   it('Adds Favs After Login', () => {
//     cy.visit('http://localhost:4200/')

//     cy.get('#loginButton').click()

//     cy.get('#nameGiven').click()
//     cy.get('#nameGiven').type('urmom')

//     cy.get('#passGiven').type('urmom')
    
//     cy.get('#submitBtnHolder').click()

//     cy.get('nearbyPlaces').invoke(openSId)
//   })
// })