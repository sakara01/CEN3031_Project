import { Element } from "@angular/compiler"
import { AppComponent } from "app/app.component"

describe('UNLOGGED User Clicks Map Pins', () => {
    it('Clicks on Map Pin Initially', () => {
      cy.visit('http://localhost:4200/')
  
      //trouble w this bc the map pins are multiple elements, so cannot just test on one
      //also sidebar does not automatically appear after clicking
    
      cy.get('map-marker').click({ multiple: true, force: true })
      
      
      

      //bruh idk how to call the markerClicked function
      // cy.get('map-marker').invoke('markerClicked')
      
    })
  })

  describe('LOGGED in User Clicks Map Pins', () => {
    it('Logs in and clicks map pins', () => {
      cy.visit('http://localhost:4200/')

      cy.get('#loginButton').click()

      cy.get('#nameGiven').click()
      cy.get('#nameGiven').type('TestUser')

      cy.get('#passGiven').click()
      cy.get('#passGiven').type('TestPass')

      cy.get('#submitBtn').click()
      cy.get('#createAcct').click()
      cy.get('#closeBtn').click()

      cy.get('map-marker').click({ multiple: true, force: true })
    })
  })