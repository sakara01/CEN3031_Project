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