import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { FavoritesComponent } from '../favorites/favorites.component';
import { LoginComponent } from '../login/login.component';
import { Address } from 'ngx-google-places-autocomplete/objects/address';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() label=''; title="header";
  @Output() header= new EventEmitter()
  @Output() searchAreaClicked = new EventEmitter<string>();
  @Output() searchBarClicked = new EventEmitter<google.maps.LatLngLiteral>();

  
  constructor(private login: LoginComponent, private http: HttpClient, private favorites: FavoritesComponent) {}

  userData: any;
  favTransfer: any = 'idk';

  options: any = {
    componentRestrictions: {}
  }  

  handleAddressChange(address: Address) {
    this.searchClicked({lat: address.geometry.location.lat(), lng: address.geometry.location.lng()})
  }

  ngOnInit(): void {
    let winWidth= window.innerWidth;
    winWidth.toString()+"px";
    (document.getElementById("header")as HTMLFormElement).style.width = winWidth.toString()+"px";
  }

  searchClicked(address: google.maps.LatLngLiteral){
    this.searchBarClicked.emit(address);
  }
  
  startLoginComp(){
    this.login.openLoginModal();
  }

  updateName(user: string){
    if (user == "Logged out"){
      (document.getElementById("loginName")as HTMLFormElement).innerHTML = user;
      setTimeout(()=> {
        (document.getElementById("loginName")as HTMLFormElement).innerHTML = "";
        (document.getElementById("showFavs")as HTMLElement).style.visibility = "hidden";
      },1500);
    }else {
      (document.getElementById("loginName")as HTMLFormElement).innerHTML = "Welcome, " + user;
      (document.getElementById("showFavs")as HTMLElement).style.visibility = "visible";
    }
  }

  showFavsPanel(){
    const header = new HttpHeaders().set('access-control-allow-origin', "*");  //allow cors request
    let nameGiven = (document.getElementById("nameGiven")as HTMLInputElement).value;
    let passGiven = (document.getElementById("passGiven")as HTMLInputElement).value;
    this.userData = { username: nameGiven, password: passGiven};
    (document.getElementById("favsPane")as HTMLFormElement).style.visibility = "visible";
    
    this.http.post('http://localhost:8080/request', this.userData, { headers: header }).subscribe((data: any) => {
       this.favorites.favShops = data;
       this.favorites.setFavorites();
    });
  }

  doSearchArea(){
    this.searchAreaClicked.emit("clicked")
  }
}
