import { Component } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(/*private AppComponent: AppComponent*/){};
  sidebarShop: any;

  openSidebar(){
    this.openDetailPane();
    
        //attributes that are outputted in side bar panel
        (document.getElementById("name") as HTMLFormElement).innerHTML= this.sidebarShop.name;
        (document.getElementById("rating") as HTMLFormElement).innerHTML= this.sidebarShop.rating;
        (document.getElementById("address") as HTMLFormElement).innerHTML= this.sidebarShop.vicinity;

        //opening hours - check if shop is open
        if(this.sidebarShop.opening_hours.open_now && this.sidebarShop.opening_hours.open_now != null){
          (document.getElementById("openNow") as HTMLFormElement).innerHTML = "open";
        }
        else {
          (document.getElementById("openNow") as HTMLFormElement).innerHTML= "closed";
        }

        //price levels - check if element is undefined
        if(this.sidebarShop.price_level == null){
          (document.getElementById("priceLevel") as HTMLFormElement).innerHTML = "price level not found";
        }
        else {
          (document.getElementById("priceLevel") as HTMLFormElement).innerHTML= this.sidebarShop.price_level;
        }

        var imageAddy = "";
        //get and set the image, check if null!
        if(this.sidebarShop.photos != null){
          //will display weird map image if exceeds available quota :(
          imageAddy = "https://maps.googleapis.com/maps/api/place/photo?photo_reference=";
          imageAddy += this.sidebarShop.photos[0].photo_reference;
          imageAddy += "&key=AIzaSyCug_XiU8cTDBlULG_BXe0UhYMgBkSSd9k";
        } else {
          imageAddy = "https://www.pngkit.com/png/detail/115-1152476_cafe-shop-png-image-coffee-shop-svg.png";
        }
        
        //set the image! 
        (<HTMLImageElement>document.getElementById("PlaceImage")).src = imageAddy;
        // (<HTMLImageElement>document.querySelector("PlaceImage"))!.setAttribute( 'src', "https://pbs.twimg.com/media/Fa3UJahWAAEUH8i.jpg:large");
  }

  openDetailPane(){
    (document.getElementById("detailPane") as HTMLFormElement).style.visibility='visible';
  }
  
}
