import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  publicUsername: string = "empty";
  @Output() login = new EventEmitter<string>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
  }

  userData: any;
  nameVar: any;
  

  public getLoginUser() {  //gets user's location and sends to backend
    let nameGiven = (document.getElementById("nameGiven")as HTMLInputElement).value;
    let passGiven = (document.getElementById("passGiven")as HTMLInputElement).value;
    this.userData = { username: nameGiven, password: passGiven};
    this.publicUsername = nameGiven;

    if (nameGiven == "" || passGiven ==""){
      (document.getElementById("loginStatus")as HTMLElement).innerHTML = "Username or password does not exist, try again";
      return;
    }

    const header = new HttpHeaders().set('access-control-allow-origin', "*");  //allow cors request

    //sends body data (user coordinates) to BACKEND
    //posts to backend and returns JSON of nearby coffee shops
    this.http.post('http://localhost:8080/mimi', this.userData, { headers: header }).subscribe((data: any) => {
      //data = username object
      var favShops = data
      console.log(favShops)
      
      if (favShops.allMyShops == "noUser"){
        console.log("No username like that");
        (document.getElementById("loginStatus")as HTMLElement).innerHTML = "Username or password incorrect, please try again.";
      }else {
        //User exists
        (document.getElementById("loginStatus")as HTMLElement).innerHTML = "Logged in Successfully!";
        this.login.emit(this.publicUsername);
        setTimeout(()=> {
          (document.getElementById("loginModal")as HTMLElement).style.visibility = "hidden";
        },1000);
      }
    });
  }

  public openLoginModal(){
    (document.getElementById("loginModal")as HTMLElement).style.visibility = "visible";
  }

  clearModal(){
    (document.getElementById("loginModal")as HTMLElement).style.visibility = "hidden";
    (document.getElementById("loginStatus")as HTMLElement).innerHTML = "";
    (document.getElementById("nameGiven")as HTMLInputElement).value = "";
    (document.getElementById("passGiven")as HTMLInputElement).value = "";
    this.publicUsername = "Logged out"
    this.login.emit(this.publicUsername);
  }
  closeModal(){
    (document.getElementById("loginModal")as HTMLElement).style.visibility = "hidden";
  }

  createAcct(){
    let nameGiven = (document.getElementById("nameGiven")as HTMLInputElement).value;
    let passGiven = (document.getElementById("passGiven")as HTMLInputElement).value;
    this.userData = { username: nameGiven, password: passGiven};
    if (nameGiven == "" || passGiven ==""){
      (document.getElementById("loginStatus")as HTMLElement).innerHTML = "Username or password not possible, try again";
      return;
    }


    const header = new HttpHeaders().set('access-control-allow-origin', "*");  //allow cors request
    console.log("should not print if empty");
    this.http.post('http://localhost:8080/create', this.userData, { headers: header }).subscribe((data: any) => {
      //data = username object
      if (data.status == "userAlreadyExists"){
        (document.getElementById("loginStatus")as HTMLElement).innerHTML = "User Already Exists! Login or make a new account";
      }else if (data.status == "userAdded"){
        (document.getElementById("loginStatus")as HTMLElement).innerHTML = "User Added! Login now";
        (document.getElementById("nameGiven")as HTMLInputElement).value = "";
        (document.getElementById("passGiven")as HTMLInputElement).value = "";
      }
    });
  }
}
