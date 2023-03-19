import { Component } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(/*private AppComponent: AppComponent*/) { };
  sidebarShop: any;
  imgHeight: any;
  coffeeShopName: any;
  coffeeShopAddress: any;

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
  }

  closeDetailPane(){
    (document.getElementById("detailPane") as HTMLFormElement).style.visibility = 'hidden';

  }

}
