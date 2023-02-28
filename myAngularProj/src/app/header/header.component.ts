import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() label=''; title="header";
  @Output() clicked= new EventEmitter()
  
  constructor() { }

  ngOnInit(): void {
    let winWidth= window.innerWidth;
    winWidth.toString()+"px";
    (document.getElementById("header")as HTMLFormElement).style.width = winWidth.toString()+"px";
  }

  searchClicked(){
    console.log("search clicked");
  }

}
