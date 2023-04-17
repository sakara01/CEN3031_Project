import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
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
    const title: HTMLElement = fixture.debugElement.nativeElement.querySelector('#logintext');
    expect(title.innerHTML).toBe("Sign In");
  });

  it('should display option to enter Username and Password',()=>{
    expect(component.publicUsername).toBe("empty");
    expect(component.userData).toBe(undefined);
  });
  
  it('should check Sign In button click', fakeAsync(()=> {
    spyOn(component, 'getLoginUser');
    let signInBtn = fixture.debugElement.nativeElement.querySelector('#submitBtn');
    signInBtn.click();
    tick();
    expect(component.getLoginUser).toHaveBeenCalled();
  }));

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
