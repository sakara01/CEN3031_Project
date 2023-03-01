import { HeaderComponent } from "./header.component"
import { RouterTestingModule } from "@angular/router/testing"

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

