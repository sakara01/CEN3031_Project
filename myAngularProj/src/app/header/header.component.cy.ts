import { HeaderComponent } from "./header.component"

describe('HeaderComponent', () => {

    it('can mount', () => {
        cy.mount(HeaderComponent)
    })

    //tests only the search button's click
    it('button can be clicked', () => {
        cy.mount(HeaderComponent)
        cy.get('#header > #searchBtn').click()
      })

})
