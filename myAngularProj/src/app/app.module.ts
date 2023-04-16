import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { BookmarkComponent } from './bookmarks/boookmark.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    LoginComponent,
    FavoritesComponent,
    BookmarkComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GoogleMapsModule,
  ],
  exports:[
    LoginComponent,
    FavoritesComponent,
    BookmarkComponent
  ],
  providers: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    LoginComponent,
    FavoritesComponent,
    BookmarkComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
