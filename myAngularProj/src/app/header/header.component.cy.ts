import { HeaderComponent } from "./header.component"
import { RouterTestingModule } from "@angular/router/testing"

describe('HeaderComponent', () => {

    it('can mount', () => {
        cy.mount(HeaderComponent)
    })

})

