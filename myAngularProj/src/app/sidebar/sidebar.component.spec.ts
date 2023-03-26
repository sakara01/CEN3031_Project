import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
      ],
      declarations: [ SidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const exampleShop= {
      "business_status": "OPERATIONAL",
      "geometry": {
        "location": {
          "lat": 29.6480776,
          "lng": -82.3438496
        },
        "viewport": {
          "northeast": {
            "lat": 29.64942738029149,
            "lng": -82.3423238697085
          },
          "southwest": {
            "lat": 29.6467294197085,
            "lng": -82.34502183029151
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/cafe-71.png",
      "icon_background_color": "#FF9E67",
      "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/cafe_pinlet",
      "name": "Starbucks",
      "opening_hours": {
        "open_now": true
      },
      "photos": [
        {
          "height": 1200,
          "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/103083886789521773211\">Gokhan Go</a>"
          ],
          "photo_reference": "AfLeUgO8aFygCxx2VY0XQG4JnT9hhEq9sHibzKrQZm0Dsqdnm4o0F7Av9yL6MPzXE8ZLq4ntOyhIsCZcO3yGzW5nnM0jjNOoDorpFjszrAP03-Xg71MpC-cDTguvutDxn4QSXXSkR7UpWGYK31GEpNoOUyDdN5jvI21s9OqbL64d5latELKP",
          "width": 1798
        }
      ],
      "place_id": "ChIJzy15Rp2j6IgRu8WtHUhwnb8",
      "plus_code": {
        "compound_code": "JMX4+6F Gainesville, FL, USA",
        "global_code": "76XVJMX4+6F"
      },
      "price_level": 2,
      "rating": 2.9,
      "reference": "ChIJzy15Rp2j6IgRu8WtHUhwnb8",
      "scope": "GOOGLE",
      "types": [
        "cafe",
        "food",
        "point_of_interest",
        "store",
        "establishment"
      ],
      "user_ratings_total": 26,
      "vicinity": "444 Newell Drive, Gainesville"
    }
    component.sidebarShop= exampleShop;
    component.openSidebar();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check sidebar visibility on marker click', () =>{
    //(document.getElementById("detailPane") as HTMLFormElement).style.visibility = 'visible';
    const pane= fixture.debugElement.nativeElement.querySelector('#detailPane');
    const vis= getComputedStyle(pane).getPropertyValue("visibility");
    expect(vis).toBe("visible");
  });

  it('should check if cafe image exists',() =>{
    //const element= fixture.debugElement.nativeElement.querySelector('#PlaceImage');
    //const w= parseInt(getComputedStyle(element).getPropertyValue("width"));
    //console.info(component.imgHeight);
    expect(component.imgHeight).toBeGreaterThan(0);
  });

  //some details may be missing from places object
  //but check that the necessary details are included: place name and address
  
  //place name
  it('should check if cafe name displays',() =>{
    expect(component.coffeeShopName).toBeDefined();
  });

  //place address
  it('should check if cafe address displays',() =>{
    expect(component.coffeeShopAddress).toBeDefined();
  });

});
