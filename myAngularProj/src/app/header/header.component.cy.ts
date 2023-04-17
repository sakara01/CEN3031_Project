import { HeaderComponent } from "./header.component"
import { RouterTestingModule } from "@angular/router/testing"
import { Component } from "@angular/core"
import { LoginComponent } from '../login/login.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FavoritesComponent } from 'app/favorites/favorites.component';
import { TestBed, async } from '@angular/core/testing';

describe('HeaderComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
          imports: [
            HttpClientTestingModule,
          ],
          declarations: [
            HeaderComponent, LoginComponent, FavoritesComponent
          ],
          providers:[LoginComponent,FavoritesComponent]
        }).compileComponents();
      }));

    it('can mount', () => {
        cy.mount(HeaderComponent)
    })

    //tests if search bar can be typed into
    it('seach bar is typed into', () => {
        cy.mount(HeaderComponent)
        cy.get('form-control').type('San Francisco')
      })

})

