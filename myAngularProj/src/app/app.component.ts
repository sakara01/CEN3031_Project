import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Component, Input, OnInit, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { MapDirectionsService } from '@angular/google-maps';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { BehaviorSubject, Observable, map } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  template: `
      <google-map #map
                width="100%"
                height="100%"
                [center]="center"
                [zoom]="zoom">

        <map-marker
          *ngFor="let marker of markers"
          [position]="marker"
          [options]="markerOptions"
          (mapClick)="markerClicked(marker)"
        >
        </map-marker>
        <map-marker
          [position]="center"
          [options]="userMarker"
          >
        </map-marker>
        <!-- <map-polyline
          [path]="route"
          >
        </map-polyline> -->
        <map-directions-renderer
          *ngIf="(directionsResults$ | async) as directionsResults"
          [directions]="directionsResults"
          [options]="routeOptions"></map-directions-renderer>

  </google-map>
  `,
})
export class AppComponent implements OnInit {
  @ViewChild(GoogleMap) mapElement!: GoogleMap;
  private cn: google.maps.LatLngLiteral = { lat: 0, lng: 0 }; // Initial center coordinates
  private zm: number = 10; // Initial zoom level

  @Input() label='';
  @Output() clicked= new EventEmitter()
  
  title = 'myAngularFile';

  public coffeeShop: any;
  public nearbyPlaces: any;  //declare as global so markerClicked() can access it
  appSidebarData: any;  // parent to child communication
  userLoc: any;  //parent to child communication


  display: any;
  public center: any;
  route: any;
  public dest: any;
  public orig: any;
  currentLat: any;
  currentLng: any;
  selectedLocation: any;

  constructor(private http: HttpClient, private sidebar: SidebarComponent, private header: HeaderComponent,
    private mapDirectionsService: MapDirectionsService, 
  ) {
    const request: google.maps.DirectionsRequest = {
      destination: {},
      origin: {},
      travelMode: google.maps.TravelMode.DRIVING
    };
    console.log(this.center);
    this.directionsResults$ = this.mapDirectionsService.route(request).pipe(map(response => response.result));
  }

  //center_test: google.maps.LatLngLiteral = {lat: 24, lng: 12};

  directionsResults$: Observable<google.maps.DirectionsResult|undefined>;


  zoom = 14;
  markerOptions: google.maps.MarkerOptions = 
  { draggable: false ,
    icon: '../assets/coffeeIcon(3).png',
  };
  markers: google.maps.LatLngLiteral[] = [];
  userMarker: google.maps.MarkerOptions = { draggable: false,
    icon: '../assets/map-marker (1).gif'
  };

  routeOptions: google.maps.DirectionsRendererOptions = 
  {
    markerOptions: {visible: false}
  };

  calcRoute(dest: google.maps.LatLngLiteral): google.maps.LatLngLiteral {
    const request: google.maps.DirectionsRequest = {
      destination: {lat: dest.lat, lng: dest.lng},
      origin: {lat: this.center.lat, lng: this.center.lng},
      travelMode: google.maps.TravelMode.DRIVING,
    };
    console.log(this.center)
    console.log(dest)
    this.directionsResults$ = this.mapDirectionsService.route(request).pipe(map(response => response.result));
    return dest
  }


  ngOnInit(): void {
    this.getUserLocation();
    //this.watchPosition();
    this.resizePage();
    navigator.geolocation.getCurrentPosition((position)=> {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      this.currentLat = position.coords.latitude;
      this.currentLng = position.coords.longitude;
    })
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
        //console.log(this.appSidebarData);
        this.sidebar.openSidebar();    
      } 
    }
    this.dest = myMarker;
    this.calcRoute(myMarker);
    /*
    this.route = [
      { lat: this.coffeeShop.geometry.location.lat, lng: this.coffeeShop.geometry.location.lng },
      { lat: this.center.lat, lng: this.center.lng },
      ];

    
      */
     //let destination = `${this.coffeeShop.geometry.location.lat}, ${this.coffeeShop.geometry.location.lng}`
     //this.sendCenter()
  }

  //finds local cafes in the area based on user location
  //bc local cafes are stored in 'body' variable, which is read in this function
  public getUserLocation(): any {  //gets user's location and sends to backend

    //gets user location
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = { lat: position.coords.latitude, lng: position.coords.longitude };
      this.zoom = 14;
      this.userLoc = `${position.coords.latitude},${position.coords.longitude}`
      
      this.nearbySearch(this.center)
    })
    return this.nearbyPlaces
  }

  public nearbySearch(center: any){
    const header = new HttpHeaders().set('access-control-allow-origin', "*");  //allow cors request

    //sends body data (user coordinates) to BACKEND
    //posts to backend and returns JSON of nearby coffee shops
    this.http.post('http://localhost:8080/', center, { headers: header }).subscribe((data) => {
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

  /*
  public sendCenter(lat: any,lng: any){
    let center = { lat: lat, lng: lng };
    console.log(this.center)
    console.log(center)
    this.nearbySearch(center)
  }

  public onMapDrag(){
    console.log("map dragged")
    let center = this.mapElement.getCenter()
    var lat = center!.lat(); // Get the latitude of the map's center
    var lng = center!.lng();
    console.log(lat)
    this.sendCenter(lat,lng)
  }
  */

  public searchThisArea(){
    let centerfunc = this.mapElement.getCenter()
    var lat = centerfunc!.lat(); // Get the latitude of the map's center
    var lng = centerfunc!.lng();
    let center = { lat: lat, lng: lng };
    this.nearbySearch(center)
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

