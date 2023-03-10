import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ]
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
});
