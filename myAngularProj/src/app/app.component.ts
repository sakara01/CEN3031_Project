import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';

/*import { ConsoleReporter } from 'jasmine';
*/
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'myAngularFile';

  public getJsonValue: any;
  public postJsonValue: any;
  

  constructor(private http: HttpClient){}

  ngOnInit():void{
    //this.getMethod();
    //this.postMethod();
    this.getUserLocation();

    navigator.geolocation.getCurrentPosition((position) => {
      console.log(
        `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
      );
    });
    this.watchPosition();
  }

  watchPosition() {
    let desLat = 0;
    let desLon = 0;
    let id = navigator.geolocation.watchPosition(
      (position) => {
        console.log(
          `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
        ); 
        if(position.coords.latitude == desLat) {
          navigator.geolocation.clearWatch(id);
        }
      }, 
      (err) => {
        console.log(err);
      },{
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0
    });
  }

  //finds user location, but we are doing that in the getUserLocation func
  //Not needed, but dont delete
  public getMethod(){  
    this.http.get('http://localhost:8080').subscribe((data)=>{
      console.log(data);
      this.getJsonValue = data;
    });
  }
 
  //finds local cafes in the area based on user location
  //bc local cafes are stored in 'body' variable, which is read in this function
  public getUserLocation(){  //gets user's location and sends to backend
    
      //gets user location
      navigator.geolocation.getCurrentPosition((position) => { 
        let lat = 29.650711581658616;
        let long = -82.33353313281813;

        const header = new HttpHeaders().set('access-control-allow-origin',"*");  //allow cors request
        
        // body = coordinates of where user is
        let body = {
          Lat: lat,
          Long: long,
        }

        //sends body data (user coordinates) to BACKEND
        //posts to backend and returns JSON of nearby coffee shops
        this.http.post('http://localhost:8080/', body, {headers: header}).subscribe((data)=>{  
          //data = JSON of all nearby places sent by Places API

          //convert JSON into nearbyPlaces objects
          //JSON > string > objects
          let placesString:string = JSON.stringify(data)
          var placesObj  = JSON.parse(placesString)

          //array to hold all of the placesObj objects
          var nearbyPlaces: typeof placesObj[] = placesObj.results;
          
          //example on how to access the name
          console.log(nearbyPlaces[0]);
          //example on how to access latitude
          console.log(nearbyPlaces[0].geometry.location.lat);

          this.postJsonValue = "POST successful";
        });
      })     
  }



}

