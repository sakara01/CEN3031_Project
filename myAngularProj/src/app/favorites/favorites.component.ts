import { Component } from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent {

  constructor() { };

  favShops: any;

  closeFavsPane(){
    (document.getElementById("favsPane") as HTMLFormElement).style.visibility = 'hidden';

  }
  
  setFavorites(){
    console.log(this.favShops.allMyShops);
    (document.getElementById("showFavs")as HTMLElement).style.visibility = "visible";
    (document.getElementById("name1")as HTMLElement).innerHTML = this.favShops.allMyShops[0].name;
    (document.getElementById("name2")as HTMLElement).innerHTML = this.favShops.allMyShops[1].name;
    (document.getElementById("name3")as HTMLElement).innerHTML = this.favShops.allMyShops[2].name;
    (<HTMLImageElement>document.getElementById("shop1Image")).src = this.favShops.allMyShops[0].photoref;
    (<HTMLImageElement>document.getElementById("shop2Image")).src = this.favShops.allMyShops[1].photoref;
    (<HTMLImageElement>document.getElementById("shop3Image")).src = this.favShops.allMyShops[2].photoref;

  }

}
