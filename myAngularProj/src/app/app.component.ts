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
    this.getMethod();
    this.postMethod();
  }

  public getMethod(){
    this.http.get('http://localhost:8080').subscribe((data)=>{
      console.log(data);
      this.getJsonValue = data;
    });
  }

  public postMethod(){
    const header = new HttpHeaders({
      contentType: 'application/json'
    })
    
    let body = {
      title: 'foo',
      body: 'bar',
      userId: 1,
    }
    /*
    this.http.post('http://localhost:8080',body, {headers: header}).subscribe((data)=>{
      console.log(data);
      this.postJsonValue = data;
    });
    */
  }


}
