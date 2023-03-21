import { Component } from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent {

  constructor() { };

  closeFavsPane(){
    (document.getElementById("favsPane") as HTMLFormElement).style.visibility = 'hidden';

  }

}
