import { SidebarComponent } from "app/sidebar/sidebar.component"
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, async } from '@angular/core/testing';

describe('SidebarComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
          imports: [
            HttpClientTestingModule,
          ],
          declarations: [
            SidebarComponent
          ],
        }).compileComponents();
      }));

    it ('can mount', () => {
        cy.mount(SidebarComponent);
    });
    it ('shows detailPane', () => {
        cy.mount(SidebarComponent);
        cy.get('#detailPane')
        cy.get('#detailPane > #name')
    })
});