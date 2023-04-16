import { HeaderComponent } from "./header.component"
import { RouterTestingModule } from "@angular/router/testing"
import { Component } from "@angular/core"
import { LoginComponent } from '../login/login.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FavoritesComponent } from 'app/favorites/favorites.component';
import { BookmarkComponent } from 'app/bookmarks/boookmark.component';
import { TestBed, async } from '@angular/core/testing';

describe('HeaderComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
          imports: [
            HttpClientTestingModule,
          ],
          declarations: [
            HeaderComponent, LoginComponent, FavoritesComponent, BookmarkComponent
          ],
          providers:[LoginComponent, FavoritesComponent, BookmarkComponent]
        }).compileComponents();
      }));

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

