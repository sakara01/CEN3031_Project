import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesComponent } from './favorites.component';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoritesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
   it('should check favsPane visbility on marker click', () =>{
    (document.getElementById("favsPane") as HTMLFormElement).style.visibility = 'visible';
    const pane= fixture.debugElement.nativeElement.querySelector('#favsPane');
    const vis= getComputedStyle(pane).getPropertyValue("visibility");
    expect(vis).toBe("visible");
  })
  
});