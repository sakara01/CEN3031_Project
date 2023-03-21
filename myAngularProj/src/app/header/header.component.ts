import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { LoginComponent } from '../login/login.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() label=''; title="header";
  @Output() header= new EventEmitter()
  
  constructor(private login: LoginComponent) {}

  counter =0

  ngOnInit(): void {
    let winWidth= window.innerWidth;
    winWidth.toString()+"px";
    (document.getElementById("header")as HTMLFormElement).style.width = winWidth.toString()+"px";
  }

  searchClicked(){
    console.log("search clicked");
    let address = (document.getElementById("addressInput")as HTMLInputElement).value;
    this.header.emit(address);
  }
  
  startLoginComp(){
    this.login.openLoginModal();
  }

  updateName(user: string){
    if (user == "Logged out"){
      (document.getElementById("loginName")as HTMLFormElement).innerHTML = user;
      setTimeout(()=> {
        (document.getElementById("loginName")as HTMLFormElement).innerHTML = "";
      },2000);
    }else {
      (document.getElementById("loginName")as HTMLFormElement).innerHTML = "Welcome, " + user;
    }
  }
}
