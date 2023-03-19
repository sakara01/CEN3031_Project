package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"

	"github.com/gorilla/mux"
)

type Location struct {
	Lat  float64 `json:"lat"`
	Long float64 `json:"lng"`
}

type Login struct {
	Username string `json:"username"`
}

func main() { //starts server using go's http package
	mux := mux.NewRouter()
	mux.HandleFunc("/mimi", loginHandler).Methods("POST", "OPTIONS")
	mux.HandleFunc("/", postHandler).Methods("POST", "OPTIONS")
	http.ListenAndServe(":8080", mux)

}

func enableCors(w *http.ResponseWriter) { //allows frontend and backend to communicate
	(*w).Header().Add("Access-Control-Allow-Origin", "*")
	(*w).Header().Add("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS")
	(*w).Header().Add("Access-Control-Allow-Headers", "access-control-allow-origin, Content-Type")
	(*w).Header().Add("Access-Control-Allow-Credentials", "true")
}

// DONT REALLY NEED THIS, but dont delete, since we'll find the user location in postHandler()
// finds user location from input (url)
// for example, right now it's centered at the Metropolitan Museum of Art
func getHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)

	//geoLocationUrl := "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCug_XiU8cTDBlULG_BXe0UhYMgBkSSd9k"

	url := "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Metropolitan%20Museum%20of%20Art%20Art&inputtype=textquery&fields=formatted_address,name,rating,opening_hours,geometry&key=AIzaSyCug_XiU8cTDBlULG_BXe0UhYMgBkSSd9k"
	method := "GET"

	client := &http.Client{}
	req, err := http.NewRequest(method, url, nil)

	if err != nil {
		fmt.Println(err)
		return
	}
	res, err := client.Do(req)
	if err != nil {
		fmt.Println(err)
		return
	}
	defer res.Body.Close()

	body, err := io.ReadAll(res.Body)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(string(body))

	w.Header().Set("Content-Type", "application/json")

	w.Write(body) //writes json data to localhost:8080
}

// finds user location
// then gets the nearby places around location coordinates
// filter nearby places in the url
func postHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)

	//receives user location from front end?
	//MIGHT be unnecessary???
	buf := new(strings.Builder)
	_, err := io.Copy(buf, r.Body)
	// check errors
	fmt.Println(buf.String())

	var myLoc Location
	json.Unmarshal([]byte(buf.String()), &myLoc)

	fmt.Println(myLoc.Lat)

	//if location is not found = Google HQ by default

	//converts location to string
	latitude := fmt.Sprintf("%f", myLoc.Lat)
	longitude := fmt.Sprintf("%f", myLoc.Long)

	//concatonate to put inside url
	locationString := "location=" + latitude + "," + longitude

	url := "https://maps.googleapis.com/maps/api/place/nearbysearch/json?" + locationString + "&radius=2000&type=cafe&key=AIzaSyCug_XiU8cTDBlULG_BXe0UhYMgBkSSd9k"

	method := "GET"

	//request nearby places data from Places API
	client := &http.Client{}
	req, err := http.NewRequest(method, url, nil)
	if err != nil {
		fmt.Println(err)
		return
	}

	res, err := client.Do(req)
	if err != nil {
		fmt.Println(err)
		return
	}
	defer res.Body.Close()

	body, err := io.ReadAll(res.Body) // ALL PLACES API DATA IS STORED IN 'body'
	if err != nil {
		fmt.Println(err)
		return
	}

	//fmt.Println(string(body)) //prints to debug console in VS code

	w.Header().Set("Content-Type", "application/json") //sets localhost:8080 to display json

	w.Write(body) //writes json data to localhost:8080

	/* NO longer needed
	coordinates := Location{123.2, 456.3} //make this Places API data

	finalJson, err := json.Marshal(coordinates) //encodes json data to send to frontend
	if err != nil {
		fmt.Fprintf(w, "Error: %s", err)
	}
	*/
}

func loginHandler(w http.ResponseWriter, r *http.Request) {
	(w).Header().Add("Access-Control-Allow-Origin", "*")
	(w).Header().Add("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS")
	(w).Header().Add("Access-Control-Allow-Headers", "access-control-allow-origin, Content-Type")
	(w).Header().Add("Access-Control-Allow-Credentials", "true")

	//if location is not found = Google HQ by default
	//fmt.Println("login handler")

	//for some reason this version of stringifying and decoding works much better and doesnt cause cors errors.
	buf := new(strings.Builder)
	_, err := io.Copy(buf, r.Body)
	if err != nil {
		fmt.Println(err)
		return
	}

	fmt.Println(buf.String())
	loginString := buf.String()

	var user1 Login
	json.Unmarshal([]byte(loginString), &user1)

	fmt.Println(user1.Username)

	//TODO: return list of favorited coffee shops or something
	w.Header().Set("Content-Type", "application/json") //sets localhost:8080 to display json

	w.Write([]byte(loginString)) //writes json data to localhost:8080

}
