describe('drag map and click search button', () => {
    //test when user drags map and clicks search area button
    it('seach area button is clicked', () => {
        cy.visit('http://localhost:4200/')

        cy.get('#container').get('google-map')
        .trigger('mousedown', { which: 1 })
        .trigger('mousemove', { which: 1, pageX: 300, pageY: 300 })
        .trigger('mousemove', { which: 1, pageX: 100, pageY: 100 })
        .trigger('mouseup')

        cy.get('#searchAreaBtn').click()
    })

})

describe('type into search bar', () => {
    //test when user drags map and clicks search area button
    it('typing into search bar', () => {
        cy.visit('http://localhost:4200/')

        cy.get('.form-control').type('San Francisco')
        // cy.get('#container').click(200,80) // clicks on the satellite button
        cy.get('.pac-matched').first().click() // satellite 
    })

})



