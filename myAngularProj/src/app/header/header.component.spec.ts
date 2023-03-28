import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { By } from '@angular/platform-browser';
import { LoginComponent } from '../login/login.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FavoritesComponent } from 'app/favorites/favorites.component';


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
    spyOn(component,'searchClicked');
    let searchBtn = fixture.debugElement.nativeElement.querySelector('#searchBtn');
    searchBtn.click();
    tick();
    expect(component.searchClicked).toHaveBeenCalled();
  }));

  it('heart is visible when logged in', fakeAsync(()=> {
    spyOn(component, 'showFavsPanel');
    const vis = (document.getElementById("favsPane")as HTMLFormElement).style.visibility = "visible";
    let favsButton = document.getElementById("showFavs")as HTMLFormElement;
    favsButton.click();
    tick();
    expect(vis).toBe("visible");
  }));
});
