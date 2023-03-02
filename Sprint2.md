Group 96: Lauren Escarcha,
Karen Tong,
Saloni Karanth,
Justus Geslani


Link to video: 
https://drive.google.com/file/d/1ZACPkNgOu586TSO4sNKCC_YodJ_A43l5/view?usp=sharing 


User Stories completed:
- As a user, I want to be able to click on the pin of a specific coffee shop and be presented with the following details: name, opening hours, address, rating, price level, potential photo(s) of the place.
- As a user, I want to be able to automatically see my current location on the map and have it be distinguishable from the other pins on the map.


Work completed:
- Custom map marker for User’s location.
- Custom markers for coffee shops.
- Marker click opens up the side panel with coffee shop details.
- Detail panel scrolls during overflow rather than the whole window.
- Added header displaying name of the website.
- Added text input box for manually entered address and search button
- Fixed minor coffee shop image formatting issues.

**Frontend Unit Tests**
- Header Component: 
    - Create component
    - Checks title and color of header
    - Checks if the function searchClicked() is called when the search button is clicked.

- Sidebar Component:
- Create component
    - Checks that the visibility of Detail Panel is set to visible when component function openSidebar() is called.
    - Checks that the image associated with a particular coffee shop exists and is imported correctly.
    - Checks that the name and address of the coffee shop is displayed correctly.

- Cypress test:
    - Checks clicking the header button calls the function searchClicked correctly. 
    - Checks that the sidebar panel successfully displays with place details.

**Backend Unit Tests**
- Checks Status of request and verifies data received matches expected data.
- Checks if the backend throws an error when coordinates are empty.

**BACKEND API DOCUMENTATION**

Overview: 

When the frontend loads in the browser it automatically finds and sends the coordinates for the User’s location to the backend. To do this, the frontend sends a post request with the coordinates and subscribes to the data at localhost:8080. The backend receives the post request and creates a get request to Google’s Places API. The get request asks for a nearby Search of the coordinates given earlier. The backend reads the response given by the Places API and writes it to localhost:8080 to be read by the frontend. The frontend receives a Json object which it then parses, cleans, and uses to display the map markers as well as the shop details in the side panel. 


Tutorial:

To use the backend independently of the frontend, a post request containing coordinates must be sent to it.  An http.NewRequest and http.NewRecorder must be created, which are then used with ServeHTTP to make the post request. The field Body on the NewRecorder contains all of the data sent by the backend. 


Example of using backend independently: 
```
mockBody := "{\"lat\":28.878060,\"lng\":-82.035319}"   //put any coordinates here
myReader := strings.NewReader(mockBody)
req, err := http.NewRequest("POST", "/", myReader)

if err != nil {
    t.Fatal(err)
}

rr := httptest.NewRecorder()
handler := http.HandlerFunc(postHandler)
handler.ServeHTTP(rr, req)    //rr.Body contains data sent by backend.

//checks if status is okay
if status := rr.Code; status != http.StatusOK {
        t.Errorf("handler returned wrong status code: got %v, want %v", status, http.StatusOK)
    }
```
