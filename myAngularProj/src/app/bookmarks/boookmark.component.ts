import { Component, Input } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { initial } from 'cypress/types/lodash';

@Component({
  selector: 'app-bookmark',
  templateUrl: './boookmark.component.html',
  styleUrls: ['./boookmark.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BookmarkComponent {
  @Input() transfer: any;  //not needed

  constructor() { };

  boookmarkShops: any;
  
  setBookmark(){
    console.log(this.boookmarkShops);
    (document.getElementById("bookmarksPane")as HTMLFormElement).style.visibility = "visible";

    let img = new Image();
    /*
    (document.getElementById("name1")as HTMLElement).innerHTML = this.boookmarkShops.allMyShops[0].name;
    (<HTMLImageElement>document.getElementById("shop3Image")).src = this.boookmarkShops.allMyShops[2].photoref;
    */

    for (let i =0; i< this.boookmarkShops.allMyShops.length; i++){
      (document.getElementById("bookmarksPane") as HTMLFormElement).innerHTML += `<div class="shop" >
                                                                                <div class="imgHolder">
                                                                                    <img class="shopimage" id="image${i}" src="${this.boookmarkShops.allMyShops[i].photoref}"/>
                                                                                </div>

                                                                                <div class="shopname" id="name${i}">${this.boookmarkShops.allMyShops[i].name}</div>
                                                                            </div>`;
            
      img.src = this.boookmarkShops.allMyShops[i].photoref;  
      if (img.naturalHeight < img.naturalWidth){
        (document.getElementById("image"+i) as HTMLFormElement).style.height="90px";
        (document.getElementById("image"+i) as HTMLFormElement).style.width="auto";
      }
    }

    const button = document.getElementById('closeBookmark');
    button?.addEventListener('click', function handleClick(event) {
      (document.getElementById("bookmarksPane") as HTMLFormElement).style.visibility = 'hidden';
    });
  }

}
