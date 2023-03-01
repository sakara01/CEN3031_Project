import { SidebarComponent } from "app/sidebar/sidebar.component"

describe('SidebarComponent', () => {
    it ('can mount', () => {
        cy.mount(SidebarComponent);
    });
});