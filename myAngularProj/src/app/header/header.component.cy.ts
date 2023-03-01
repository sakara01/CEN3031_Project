import { HeaderComponent } from "./header.component"
import { RouterTestingModule } from "@angular/router/testing"
import { Component } from "@angular/core"

describe('HeaderComponent', () => {

    it('can mount', () => {
        cy.mount(HeaderComponent)
    })

    //tests if searchClicked is called when button is clicked
    it('searchClicked called when button clicked', () => {
        cy.mount(HeaderComponent)
        .then((wrapper)=>{
            cy.spy(wrapper.component,'searchClicked').as('searchClicked')
        })
        cy.get('#header > #searchBtn').click()
        cy.get('@searchClicked').should('have.been.calledOnce')
        
      })

})

