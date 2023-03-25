import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should display Login title', () => {
    const h2: HTMLElement = fixture.nativeElement.querySelector('h2');
    expect(h2.innerHTML).toBe("Login");
  });

  it('should display option to enter Username and Password',()=>{
    expect(component.publicUsername).toBe("empty");
    expect(component.userData).toBe(undefined);
  });

  it('should check click options to Create Account, Log Out, Close Window', fakeAsync(()=>{
    spyOn(component,'createAcct');
    let createAcct = fixture.debugElement.nativeElement.querySelector('#createAcct');
    createAcct.click();
    tick();
    expect(component.createAcct).toHaveBeenCalled();

    spyOn(component,'clearModal');
    let logout = fixture.debugElement.nativeElement.querySelector('#logout');
    logout.click();
    tick();
    expect(component.clearModal).toHaveBeenCalled();

    spyOn(component,'closeModal');
    let closeBtn = fixture.debugElement.nativeElement.querySelector('#closeBtn');
    closeBtn.click();
    tick();
    expect(component.closeModal).toHaveBeenCalled();
    
  }));

  
});
