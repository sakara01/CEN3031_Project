import { Component, Input } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { initial } from 'cypress/types/lodash';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FavoritesComponent {
  @Input() transfer: any;  //not needed

  constructor() { };

  favShops: any;
  
  setFavorites(){
    console.log(this.favShops);
    (document.getElementById("favsPane")as HTMLFormElement).style.visibility = "visible";

    let img = new Image();

    //set favorites display to empty before repopulating
    (document.getElementById("favsPane") as HTMLFormElement).innerHTML = `<div style="height:16px"><button id="closeFavs">x</button></div>`  
    
    for (let i =0; i< this.favShops.allMyShops.length; i++){
      (document.getElementById("favsPane") as HTMLFormElement).innerHTML += `<div class="shop" >
                                                                                <div class="imgHolder">
                                                                                    <img class="shopimage" id="image${i}" src="${this.favShops.allMyShops[i].photoref}"/>
                                                                                </div>

                                                                                <div class="shopname" id="name${i}">${this.favShops.allMyShops[i].name}</div>
                                                                            </div>`;
            
      img.src = this.favShops.allMyShops[i].photoref;  
      if (img.naturalHeight < img.naturalWidth){
        (document.getElementById("image"+i) as HTMLFormElement).style.height="90px";
        (document.getElementById("image"+i) as HTMLFormElement).style.width="auto";
      }
    }

    const button = document.getElementById('closeFavs');
    button?.addEventListener('click', function handleClick(event) {
      (document.getElementById("favsPane") as HTMLFormElement).style.visibility = 'hidden';
    });
  }

}
