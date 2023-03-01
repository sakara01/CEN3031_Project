import { HeaderComponent } from "./header.component"
import { AppComponent } from "app/app.component"
import { RouterTestingModule } from "@angular/router/testing"

describe('HeaderComponent', () => {

    it('can mount', () => {
        cy.mount(HeaderComponent)
    })

})
describe('AppComponent', () => {
    it ('renders', () => {
        const welcomeMessage = "cypress test";
        cy.mount(AppComponent);
    });
});

