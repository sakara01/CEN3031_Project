import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'myAngularFile';

  public getJsonValue: any;
  public postJsonValue: any;

  constructor(private http: HttpClient){

  }

  ngOnInit():void{
    //this.getMethod();
    //this.postMethod();
    this.getUserLocation();
  }

  public getMethod(){  //Not needed, but dont delete
    this.http.get('http://localhost:8080').subscribe((data)=>{
      console.log(data);
      this.getJsonValue = data;
    });
  }
 
  public getUserLocation(){  //gets user's location and sends to backend
    
      navigator.geolocation.getCurrentPosition((position) => { //gets user location
         let lat = position.coords.latitude;
         let long = position.coords.longitude;
      
        
        const header = new HttpHeaders().set('access-control-allow-origin',"*");  //allow cors request
        
        let body = {
          Lat: lat,
          Long: long,
        }

        this.http.post('http://localhost:8080/',body, {headers: header}).subscribe((data)=>{  //posts request to backend and retrives response
          console.log(JSON.stringify(data)); //data contains all nearby places sent by Places API
          this.postJsonValue = "POST successful";
        });
      })     
  }
}
