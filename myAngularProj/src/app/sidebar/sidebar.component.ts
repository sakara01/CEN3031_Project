import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { FavoritesComponent } from 'app/favorites/favorites.component';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  @Input() sidebarData: any;

  constructor(private http: HttpClient,) { };
  sidebarShop: any;
  imgHeight: any;
  coffeeShopName: any;
  coffeeShopAddress: any;
  favData: any;

  openSidebar() {
    this.openDetailPane();

    var imageAddy = "";
    //get and set the image, check if null!
    if (this.sidebarShop.photos != null && this.sidebarShop.permanently_closed != true) {
      //will display weird map image if exceeds available quota :(
      imageAddy = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&photo_reference=" + this.sidebarShop.photos[0].photo_reference +"&key=AIzaSyCug_XiU8cTDBlULG_BXe0UhYMgBkSSd9k";
    } else {
      imageAddy = "https://www.pngkit.com/png/detail/115-1152476_cafe-shop-png-image-coffee-shop-svg.png";
    }

    //set the image! 
    (<HTMLImageElement>document.getElementById("PlaceImage")).src = imageAddy;
    this.imgHeight= this.sidebarShop.photos[0].height;

    //attributes that are outputted in side bar panel
    (document.getElementById("name") as HTMLFormElement).innerHTML = this.sidebarShop.name;
    //unit testing
    this.coffeeShopName = this.sidebarShop.name; 

    //rating
    (document.getElementById("rating") as HTMLFormElement).innerHTML = this.sidebarShop.rating;
    //check if user total rating is available
    if (this.sidebarShop.user_ratings_total != null) {
      (document.getElementById("totalRatings") as HTMLFormElement).innerHTML = this.sidebarShop.user_ratings_total;
      // (document.getElementById("totalText1") as HTMLFormElement).style.visibility = 'visible';
      // (document.getElementById("totalText2") as HTMLFormElement).style.visibility = 'visible';
    } 
    else {
      (document.getElementById("totalText1") as HTMLFormElement).style.visibility = 'hidden';
      (document.getElementById("totalText2") as HTMLFormElement).style.visibility = 'hidden';
    }

    (document.getElementById("totalRatings") as HTMLFormElement).innerHTML = this.sidebarShop.user_ratings_total;

    (document.getElementById("address") as HTMLFormElement).innerHTML = this.sidebarShop.vicinity;
    //unit testing
    this.coffeeShopAddress = this.sidebarShop.vicinity;

    //opening hours - check if shop is open
    if (this.sidebarShop.opening_hours != undefined && this.sidebarShop.opening_hours.open_now && this.sidebarShop.opening_hours.open_now != null) {
      (document.getElementById("openNow") as HTMLFormElement).innerHTML = "open";
    }
    else if (this.sidebarShop.opening_hours == undefined){
      (document.getElementById("openNow") as HTMLFormElement).innerHTML = "permanently closed";
    }
    else {
      (document.getElementById("openNow") as HTMLFormElement).innerHTML = "closed";
    }

    //price levels - check if element is undefined
    if (this.sidebarShop.price_level == null) {
      (document.getElementById("priceLevel") as HTMLFormElement).innerHTML = "price level not found";
    }
    else {
      (document.getElementById("priceLevel") as HTMLFormElement).innerHTML = this.sidebarShop.price_level;
    }

  }

  openDetailPane() {
    (document.getElementById("detailPane") as HTMLFormElement).style.visibility = 'visible';
    //check if loginName is empty, if empty, user not logged in
    if((document.getElementById("loginName") as HTMLFormElement) ==null  || (document.getElementById("loginName") as HTMLFormElement).innerHTML != ""){   //null when testing
      (document.getElementById("favoriteBtn") as HTMLFormElement).style.visibility = 'visible';
    }
  }

  closeDetailPane(){
    (document.getElementById("detailPane") as HTMLFormElement).style.visibility = 'hidden';
    (document.getElementById("favoriteBtn") as HTMLFormElement).style.visibility = 'hidden';

  }

  directionsClicked(){
    console.log("directions clicked");
  }

  favoriteThis(){
    let usernameRaw = (document.getElementById("nameGiven") as HTMLInputElement).value;
    let name = this.sidebarData.name;
    let placeid = this.sidebarData.place_id;
    let photoref = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&photo_reference=" + this.sidebarData.photos[0].photo_reference +"&key=AIzaSyCug_XiU8cTDBlULG_BXe0UhYMgBkSSd9k";

    //let name = (document.getElementById("name") as HTMLFormElement).innerHTML;
    //let placeid = (document.getElementById("placeid") as HTMLFormElement).innerHTML;
    //let photoref = (document.getElementById("PlaceImage") as HTMLImageElement).src;
    this.favData = { username: usernameRaw, name: name, placeid: placeid, photoref: photoref};
    console.log(this.favData)

    const header = new HttpHeaders().set('access-control-allow-origin', "*");  //allow cors request

    this.http.post('http://localhost:8080/favorite', this.favData, { headers: header }).subscribe((data: any) => {
      //data = username object
      console.log("idk in post now");
    });
    
  }
}