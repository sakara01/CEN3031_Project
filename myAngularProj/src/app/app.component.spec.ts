import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HeaderComponent } from './header/header.component';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import { FavoritesComponent } from 'app/favorites/favorites.component';

 /*
describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        GoogleMapsModule,
        
      ],
      declarations: [
        AppComponent,
        HeaderComponent,
      ],
      providers: [
        { provide: SidebarComponent, useValue: {} },
        { provide: HeaderComponent, useValue: {} },
        { provide: LoginComponent, useValue: {} },
        { provide: FavoritesComponent, useValue: {} }
      ],
    }).compileComponents();
  });
  
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

 
  it(`should have as title 'myAngularFile'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('myAngularFile');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('myAngularFile app is running!');
  });
  
});
*/
