import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

/*import { ConsoleReporter } from 'jasmine';
*/
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'myAngularFile';

  public coffeeShop: any;
  public nearbyPlaces: any;  //declare as global so markerClicked() can access it



  constructor(private http: HttpClient) {}

  display: any;
  center: any;
  zoom = 14;
  markerOptions: google.maps.MarkerOptions = { draggable: false ,
                                               icon: '../assets/coffeeIcon(3).png',
                                              };
  markers: google.maps.LatLngLiteral[] = [];
  userMarker: google.maps.MarkerOptions = { draggable: false,
    icon: '../assets/map-marker (1).gif'
  };

  ngOnInit(): void {
    this.getUserLocation();
    //this.watchPosition();
    this.resizePage();
  }

  watchPosition() {
    let desLat = 0;
    let desLon = 0;
    let id = navigator.geolocation.watchPosition(
      (position) => {
        //console.log(
        //`lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
        //); 

        if (position.coords.latitude == desLat) {
          navigator.geolocation.clearWatch(id);
        }
      },
      (err) => {
        //console.log(err);   //REMOVE comment
      }, {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0
    });
  }

  markerClicked(myMarker: google.maps.LatLngLiteral) {
    this.openDetailPane();
    for (let i=0; i<this.nearbyPlaces.length; i++){
      if (this.nearbyPlaces[i].geometry.location.lat == myMarker.lat){
        this.coffeeShop= this.nearbyPlaces[i];
        console.log(this.coffeeShop);
        (document.getElementById("name") as HTMLFormElement).innerHTML= this.coffeeShop.name;
        (document.getElementById("rating") as HTMLFormElement).innerHTML= this.coffeeShop.rating;
        (document.getElementById("address") as HTMLFormElement).innerHTML= this.coffeeShop.vicinity;
      }
    }
  }

  openDetailPane(){
    (document.getElementById("detailPane") as HTMLFormElement).style.visibility='visible';
  }

  /*
  //finds user location, but we are doing that in the getUserLocation func
  //Not needed, but dont delete
  public getMethod() {
    this.http.get('http://localhost:8080').subscribe((data) => {
      console.log(data);
      this.getJsonValue = data;
    });
  }
  */

  //finds local cafes in the area based on user location
  //bc local cafes are stored in 'body' variable, which is read in this function
  public getUserLocation() {  //gets user's location and sends to backend

    //gets user location
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = { lat: position.coords.latitude, lng: position.coords.longitude };
      this.zoom = 14;

      const header = new HttpHeaders().set('access-control-allow-origin', "*");  //allow cors request

      //sends body data (user coordinates) to BACKEND
      //posts to backend and returns JSON of nearby coffee shops
      this.http.post('http://localhost:8080/', this.center, { headers: header }).subscribe((data) => {
        //data = JSON of all nearby places sent by Places API

        //convert JSON into nearbyPlaces objects
        //JSON > string > objects
        let placesString: string = JSON.stringify(data)
        var placesObj = JSON.parse(placesString)

        //array to hold all of the placesObj objects
        this.nearbyPlaces= placesObj.results;

        for (let i = 0; i < this.nearbyPlaces.length; i++) {
          this.markers.push(this.nearbyPlaces[i].geometry.location);
        }
      });
    })
  }
 
  resizePage(){  //set container and detail pane height and width on window load.
    document.getElementById("detailPane") as HTMLFormElement;
    let winHeight=window.innerHeight;
    let winWidth=window.innerWidth;
    let h2=winHeight.toString()+"px";
    (document.getElementById("container")as HTMLFormElement).style.height = h2;
    (document.getElementById("detailPane")as HTMLFormElement).style.height = h2;
    (document.getElementById("detailPane")as HTMLFormElement).style.width = (240 + winWidth/10).toString()+"px";
    
  }

}

