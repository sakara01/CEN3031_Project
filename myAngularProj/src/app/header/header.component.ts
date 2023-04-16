import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { FavoritesComponent } from '../favorites/favorites.component';
import { BookmarkComponent } from '../bookmarks/boookmark.component';
import { LoginComponent } from '../login/login.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() label=''; title="header";
  @Output() header= new EventEmitter()
  
  constructor(
    private login: LoginComponent, 
    private http: HttpClient, 
    private favorites: FavoritesComponent,
    private bookmarks: BookmarkComponent) {}

  userData: any;
  favTransfer: any = 'idk';
  bookmarkTransfer: any = 'idk';

  ngOnInit(): void {
    let winWidth= window.innerWidth;
    winWidth.toString()+"px";
    (document.getElementById("header")as HTMLFormElement).style.width = winWidth.toString()+"px";
  }

  searchClicked(){
    console.log("search clicked");
    let address = (document.getElementById("addressInput")as HTMLInputElement).value;
    this.header.emit(address);
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
        (document.getElementById("showBookmarks")as HTMLElement).style.visibility = "hidden";
      },1500);
    }else {
      (document.getElementById("loginName")as HTMLFormElement).innerHTML = "Welcome, " + user;
      (document.getElementById("showFavs")as HTMLElement).style.visibility = "visible";
      (document.getElementById("showBookmarks")as HTMLElement).style.visibility = "visible";

    }
  }

  showFavsPanel(){
    const header = new HttpHeaders().set('access-control-allow-origin', "*");  //allow cors request
    let nameGiven = (document.getElementById("nameGiven")as HTMLInputElement).value;
    let passGiven = (document.getElementById("passGiven")as HTMLInputElement).value;
    this.userData = { username: nameGiven, password: passGiven};

    (document.getElementById("favsPane")as HTMLFormElement).style.visibility = "visible";
    console.log("should set pane to visible");
    //sends body data (user coordinates) to BACKEND
    //posts to backend and returns JSON of nearby coffee shops
    this.http.post('http://localhost:8080/request', this.userData, { headers: header }).subscribe((data: any) => {
       this.favorites.favShops = data;
       this.favorites.setFavorites();
    });
  }

  showBookmarksPanel(){
    const header = new HttpHeaders().set('access-control-allow-origin', "*");  //allow cors request
    let nameGiven = (document.getElementById("nameGiven")as HTMLInputElement).value;
    let passGiven = (document.getElementById("passGiven")as HTMLInputElement).value;
    this.userData = { username: nameGiven, password: passGiven};

    (document.getElementById("bookmarksPane")as HTMLFormElement).style.visibility = "visible";
    console.log("should set pane to visible");
    //sends body data (user coordinates) to BACKEND
    //posts to backend and returns JSON of nearby coffee shops
    this.http.post('http://localhost:8080/request', this.userData, { headers: header }).subscribe((data: any) => {
       this.bookmarks.boookmarkShops = data;
       this.bookmarks.setBookmark();
    });
  }
}
