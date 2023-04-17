import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { By } from '@angular/platform-browser';
import { LoginComponent } from '../login/login.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FavoritesComponent } from 'app/favorites/favorites.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      declarations: [ HeaderComponent, LoginComponent, FavoritesComponent ],
      providers: [
        { provide: LoginComponent, useValue: {} },
        { provide: FavoritesComponent, useValue: {} }
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title and color',()=>{
    expect(component.title).toBe("header");
    const h5: HTMLElement = fixture.nativeElement.querySelector('h5');
    expect(h5.innerHTML).toBe("Caffinder");
    const myColor = h5.style.backgroundColor;
    expect(myColor).toBe('rgb(163, 100, 49)');
  })

  it('should check search button click', fakeAsync(()=> {
    spyOn(component,'doSearchArea');
    let searchAreaBtn = fixture.debugElement.nativeElement.querySelector('#searchAreaBtn');
    searchAreaBtn.click();
    tick();
    expect(component.doSearchArea).toHaveBeenCalled();
  }));

  it('should check heart button click', fakeAsync(()=> {
    spyOn(component, 'showFavsPanel');
    let favsBtn = fixture.debugElement.nativeElement.querySelector('#showFavs');
    favsBtn.click();
    tick();
    expect(component.showFavsPanel).toHaveBeenCalled();
  }));
  
  it('should check login user button click', fakeAsync(()=> {
    spyOn(component, 'startLoginComp');
    let loginUserBtn = fixture.debugElement.nativeElement.querySelector('#loginButton');
    loginUserBtn.click();
    tick();
    expect(component.startLoginComp).toHaveBeenCalled();
  }));
  
});
