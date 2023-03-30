import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FavoritesComponent } from './favorites/favorites.component';

/*import { ConsoleReporter } from 'jasmine';
*/
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @Input() label='';
  @Output() clicked= new EventEmitter()
  
  title = 'myAngularFile';

  public coffeeShop: any;
  public nearbyPlaces: any;  //declare as global so markerClicked() can access it

  appSidebarData: any;  //test parent to child communication

  constructor(private http: HttpClient, private sidebar: SidebarComponent, private header: HeaderComponent) {}

  display: any;
  public center: any;
  route: any;
  zoom = 14;
  markerOptions: google.maps.MarkerOptions = 
  { draggable: false ,
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

    // loop thru all nearby places
    for (let i=0; i<this.nearbyPlaces.length; i++){

      //find the marker the user clicked on
      if (this.nearbyPlaces[i].geometry.location.lat == myMarker.lat){
        this.coffeeShop = this.nearbyPlaces[i];
        this.appSidebarData = this.coffeeShop; //so other functions in sidebar component can use it
        this.sidebar.sidebarShop=this.coffeeShop;  //send coffee shop data to sidebar component
        console.log(this.appSidebarData);
        this.sidebar.openSidebar();    
      } 
    }
    this.route = [
      { lat: this.coffeeShop.geometry.location.lat, lng: this.coffeeShop.geometry.location.lng },
      { lat: this.center.lat, lng: this.center.lng },
      ];
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
      //console.log(this.center);
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

        // console.log(this.nearbyPlaces[0]);

        for (let i = 0; i < this.nearbyPlaces.length; i++) {
          this.markers.push(this.nearbyPlaces[i].geometry.location);
        }
      });
    
    })
  }

  // tried to get geocoder to work
  dummyFunc(address: string){
    alert("Sorry, Geocoding development in progress");
    /*
    var coords : any
    var geocoder = new google.maps.Geocoder();
    var request: google.maps.GeocoderRequest = { address: address }
    
    geocoder
    .geocode(request)
    .then((result) => {
      const { results } = result;
      console.log(results[0].geometry.viewport.getNorthEast);
      return results;
    })
    .catch((e) => {
      alert("Geocode was not successful for the following reason: " + e);
    });
    */
  }
  

  resizePage(){  //set container and detail pane height and width on window load.
    document.getElementById("detailPane") as HTMLFormElement;
    let winHeight=window.innerHeight;
    let winWidth=window.innerWidth;
    (document.getElementById("container")as HTMLFormElement).style.height = (winHeight-44).toString()+"px";
    (document.getElementById("detailPane")as HTMLFormElement).style.height = (winHeight-50).toString()+"px";
    (document.getElementById("detailPane")as HTMLFormElement).style.width = (240 + winWidth/10).toString()+"px";
    (document.getElementById("favsPane")as HTMLFormElement).style.height = (winHeight-50).toString()+"px";
    (document.getElementById("favsPane")as HTMLFormElement).style.width = (240 + winWidth/10).toString()+"px";
  }


}

