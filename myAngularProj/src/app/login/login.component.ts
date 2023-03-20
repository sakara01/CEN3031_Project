import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
  }

  userData: any;
  nameVar: any;

  public getLoginUser() {  //gets user's location and sends to backend
    let nameGiven = (document.getElementById("nameGiven")as HTMLInputElement).value;
    this.userData = { username: nameGiven};

    const header = new HttpHeaders().set('access-control-allow-origin', "*");  //allow cors request

    //sends body data (user coordinates) to BACKEND
    //posts to backend and returns JSON of nearby coffee shops
    this.http.post('http://localhost:8080/mimi', this.userData, { headers: header }).subscribe((data: any) => {
      //data = username object
      var favShops = data
      console.log(favShops)

      if (favShops.allMyShops == null){
        console.log("favorites is null")
      }
      else if (favShops.allMyShops == "noUser"){
        console.log("No username like that")
      }
      //array to hold all of the placesObj objects
      //this.nearbyPlaces= placesObj.results;
    });
  }

  openLoginModal(){
    (document.getElementById("loginModal")as HTMLElement).style.visibility = "visible";

  }

  closeModal(){
    (document.getElementById("loginModal")as HTMLElement).style.visibility = "hidden";
  }
 
}
