describe('type into search bar', () => {
    //tests if search bar can be typed into
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

