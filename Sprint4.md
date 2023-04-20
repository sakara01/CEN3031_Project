# Group 96
## Lauren Escarcha, Karen Tong, Saloni Karanth, Justus Geslani


Link to video: 

## User Stories Completed
- As a user who wants to visit coffee shops at different places/cities, I want to be able to search for a place and view the coffee shops around it.
- As a user who wants to explore coffee shops in other areas on the map, I want to be able to drag the map and search for coffee shops within that new location.
- As a commuter, I want to preview the directions needed to get from my inputted or automatic location to the selected coffee shop.


## Work completed:
- Implemented Google Routes API 
- Implemented Google Autocomplete API 
- Implemented Search This Area and Search Bar functionality
- Added backend test for the new features
- Fixed broken Angular unit tests and added new unit tests for new features
- Added new end to end cypress tests for APIs implemented
- Improved appearance of existing front end components


## Frontend Unit Tests
- Header Component: 
	- Create component
	- Checks title and color of header
	- Checks if the function doSearchArea() is called when the search area button is clicked.
	- Checks if favorites button is available when logged in
	- Checks if the function startLoginComp() is called when the login user button is clicked.


- Sidebar Component:
	- Create component
	- Checks that the visibility of Detail Panel is set to visible when component function openSidebar() is called.
	- Checks that the image associated with a particular coffee shop exists and is imported correctly.
	- Checks that the name and address of the coffee shop is displayed correctly.
	- Checks if the function directionsClicked() is called when the directions button is clicked.
	- Checks if the function favoriteThis() is called when the favorites button is clicked.
	- Checks if the function closeDetailPane() is called when the close sidebar window button is clicked.

- Favorites Component:
	- Create component
	- Checks visibility of Favorites Panel is set to visible when component function is called
	- Check the display to close the window in the Favorites Panel


- Login Component:
	- Create component
	- Checks display of Sign In title
	- Checks display to enter Username and Password
	- Checks if the function createAcct() is called when the create account is 
	- Checks if the function clearModal() is called when the log out is clicked.
	- Checks if the function closeModal() is called when the close button is clicked.
	- Checks if the function getLoginUser() is called when the Sign In button is clicked.


- Cypress test:
	- Checks that clicking the header button calls the function searchClicked correctly. 
	- Checks that click the map pins are able to serve as buttons. 
	- Checks that the sign in button clicks and recognizes an incorrect login, clicks and allows a correct login to login, and for a logged in user to logout through the button.
	- Checks that a logged in user can check their saved favorite coffee shops when the Favs button in the header is clicked. 
	- Checks that the map relocates when user drags map and clicks search this area button
	- Check that the map relocates when the search bar button has a new address typed and relocates when autofilled location is chosen


## Backend Unit Tests
- Testing POST Handlers
  - TestPostHandler: Checks Status of request + verifies data received matches expected data.
  - TestPostHandlerEmptyLoc: Checks if the backend throws an error when coordinates are empty.
  - TestLoginHandlerExisting: Checks if existing user can log in given user data (username and password)
  - TestLoginHandlerNone: Ensures that nonexistent user cannot log in
  - TestCreateHandlerNew: Checks if new user can be added given user data 
  - TestCreateHandlerExisting: Ensures that existing user cannot create account with the same user data
  - TestFavoriteHandlerNew: Checks if a favorited coffee shop is correctly added to database
  - TestFavoriteHandlerExisting: Ensures that already favorited coffee shop is not added to database again
  - TestRequestHandler: Checks if request for a list of a user’s favorites coffee shops is successful
  - TestDirectionsHandler: Checks if distance/duration to coffee shop are correctly returned


- Testing helper functions
	- TestCheckUser: Checks if user exists
	- TestReturnUserData: Check if user information sent correctly


- Frontend End to End Testing:
	- Test Login and Search Button: Tests the search button functionality and the process of creating a new account and logging in
	- Along with the E2E testing mentioned in the frontend testing section


## Backend API documentation

### Overview: 

When the frontend loads in the browser it automatically finds and sends the coordinates for the User’s location to the backend. To do this, the frontend sends a POST request with the coordinates and subscribes to the data at localhost:8080. The backend receives the post request and creates a get request to Google’s Places API. The get request asks for a nearby Search of the coordinates given earlier. The backend reads the response given by the Places API and writes it to localhost:8080 to be read by the frontend. The frontend receives a Json object which it then parses, cleans, and uses to display the map markers as well as the shop details in the side panel. 

The user can login by clicking the login button at the top of the page and filling out their username and password. This is done by sending a request to the loginHandler. After clicking ‘Sign In’ the user will be logged in and can favorite new coffee shops. This is taken care of by favoriteHandler. They can also view previously favorited coffee shops upon clicking the heart button on the top of the page. A request is sent to requestHandler for this. The user can then log out by clicking Log Out. A new user could create a new account by filling out their data and clicking ‘Create Account’. This utilizes createHandler in the backend. Each handler returns appropriate data according to whether the user exists, the favorited coffee shop exists, and other conditions as described below. The directionsHandler takes in a url directed to the Google Maps Directions API with origin and destination points and sends a request to the url. It then parses and sends the received data to its caller.  The ‘Search this Area’ functionality reuses the postHandler as it simply uses a new origin and requests a Nearby Search of the area to find coffee shops.

### Tutorial for golang:
1. To use postHandler independently of the frontend, a post request containing coordinates must be sent to the backend.  An http.NewRequest and http.NewRecorder must be created, which are then used with ServeHTTP to make the post request. The PostHandler will do a nearby search of the coordinates and return a list of coffee shops. The field ‘Body’ on the NewRecorder contains all of the data sent by the backend. 

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

2. Check if existing users can login by using the same process as above but sending user data i(username and password) to the loginHandler. Replace the appropriate lines above with these. This requires a database named usernames.txt containing usernames and passwords separated by “|” to exist. This method can also be used to ensure that a nonexistent user cannot login. The backend will return either “userExists” or “noUser” in response to the given user data. 

```
    mockBody := "{\"username\":\"testcase\",\"password\":\"testcase\"}" 
    req, err := http.NewRequest("POST", "/login", myReader)
    handler := http.HandlerFunc(loginHandler)
```

3. Create a new user by giving user data to the createHandler. Replace appropriate lines with these. The createHandler in the backend will respond with either “userAdded” or “userAlreadyExists” based on whether the user exists within usernames.txt or not. 

```
    mockBody := "{\"username\":\"user1234\",\"password\":\"pass1234\"}" 
    req, err := http.NewRequest("POST", "/create", myReader)
    handler := http.HandlerFunc(createHandler)
```

4. Add a favorite coffee shop to users.txt using these lines. mockBody must contain a username, placeid, name, and photoref (link to photo of the coffee shop in Places API) and a variable called myKey must contain a Google developer Key. The photoref could also be a link to a local photo in which case the Key is not needed. A file called users.txt containing a username, placeid, shop name, and photo link separated by “|” is required. The favoriteHandler will respond with ‘FavAdded“ or “alreadyFav” depending on whether the corresponding username and coffee shop exists in users.txt.

```
mockBody := "{\"username\":\"user1234\",\"placeid\":\"U8GQYyQYyW\",\"name\":\"Starbucks\",\"photoref\":\"https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&photo_reference=AUjq9jnNU8GQYyQYyWhRtkllm&key="+myKey+"\"}" 
    	req, err := http.NewRequest("POST", "/favorite", myReader)
    	handler := http.HandlerFunc(favoriteHandler)
```


5. The requestHandler is used when a user’s previously favorited coffee shops are requested by clicking on the heart button on the top of the page. The handler will return all coffee shops favorited by the user ‘testcase’ in the example below. 

```
   mockBody := "{\"username\":\"testcase\",\"password\":\"testcase\"}" 
    req, err := http.NewRequest("POST", "/request", myReader)
    handler := http.HandlerFunc(requestHandler)
```

The directionsHandler is used when you want to find the directions from point A to B. The points must be coordinates, and must be placed in URL form and directed to the Google Maps Directions API. The handler then sends the request to the API and receives the directions from point A to B. 

    var origin = `29.638818,-82.336869`
    var destination = `29.6332719,-82.3497063`
    var apiUrl = fmt.Sprintf("https://maps.googleapis.com/maps/api/directions/json?origin=%s&destination=%s&key=%s", origin, destination, myKey)

    req, err := http.NewRequest("POST", "/directions", myReader)
    handler := http.HandlerFunc(directionsHandler)

6. The directionsHandler is used when you want to find the directions from point A to B. The points must be coordinates, and must be placed in URL form and directed to the Google Maps Directions API. The handler then sends the request to the API and receives the directions from point A to B. 

```
    var origin = `29.638818,-82.336869`
    var destination = `29.6332719,-82.3497063`
    var apiUrl = fmt.Sprintf("https://maps.googleapis.com/maps/api/directions/json?origin=%s&destination=%s&key=%s", origin, destination, myKey)

    req, err := http.NewRequest("POST", "/directions", myReader)
    handler := http.HandlerFunc(directionsHandler)

```

7. To simply test whether a user exists without calling any of the handlers, the helper function checkUser can be used. It requires username and password strings as arguments and returns true or false if the user exists or not. 

```
    var username = "testcase"
    var password = "testcase" 
    if !checkUser(username, password){
	//user doesnt exist
   }
```

8. To simply return a user’s liked coffee shops without using any handlers, use the helper function returnUserData with a username string as argument. It will return “{"allMyShops": "empty"}” or a slice of bytes containing all the coffee shops based on whether a user has any favorites or not. 

```
   var username = "testcase"
   returnuserData(username)
```

### Tutorial for angular:	

Use this method to call any handler in the backend, simply change ‘variable’ to post, login, create, favorite, or request to send a request to those handlers. userData must contain an object with username and password strings. Set header variable to allow CORS request. 

```
this.userData = { username: “user123”, password: “pass123”};
const header = new HttpHeaders().set('access-control-allow-origin', "*");  //allow cors request

this.http.post('http://localhost:8080/variable, this.userData, { headers: header }).subscribe((data: any) => {
   	//use data here to see what the response says
	});
```


To call the directions Handler, create a url with origin and destination variables.

```
  let origin= `${lat1},${lng1}`
    let destination = `${lat2},${lng2}`
    let apiUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${myKey}`;

    this.http.post('http://localhost:8080/directions', apiUrl, { headers: header }).subscribe((data: any) => {
 //use data here to see what the response says
	});
```


