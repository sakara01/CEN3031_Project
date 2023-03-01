import { SidebarComponent } from "app/sidebar/sidebar.component"

describe('SidebarComponent', () => {
    it ('can mount', () => {
        cy.mount(SidebarComponent);
    });
    it ('shows detailPane', () => {
        cy.mount(SidebarComponent);
        cy.get('#detailPane')
        cy.get('#detailPane > #name')
    })
});