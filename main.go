package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

type Location struct { //test struct, replace soon
	Lat  float64
	Long float64
}

func main() { //starts server using go's http package
	mux := mux.NewRouter()
	mux.HandleFunc("/", getHandler).Methods("GET", "OPTIONS")
	mux.HandleFunc("/", postHandler).Methods("POST", "OPTIONS")
	http.ListenAndServe(":8080", mux)

}

func enableCors(w *http.ResponseWriter) { //allows frontend and backend to communicate
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS")

	//(*w).Header().Set("Access-Control-Allow-Headers", "Content-Type")
	//(*w).Header().Set("Access-Control-Allow-Headers", "application/json")
	(*w).Header().Set("Access-Control-Allow-Headers", "access-control-allow-origin, Content-Type")
	(*w).Header().Set("Access-Control-Allow-Credentials", "true")
}

func getHandler(w http.ResponseWriter, r *http.Request) { //DONT REALLY NEED THIS, but dont delete
	enableCors(&w)

	//geoLocationUrl := "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCug_XiU8cTDBlULG_BXe0UhYMgBkSSd9k"

	url := "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=formatted_address,name,rating,opening_hours,geometry&key=AIzaSyCug_XiU8cTDBlULG_BXe0UhYMgBkSSd9k"
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

func postHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)

	var myLoc Location
	err2 := json.NewDecoder(r.Body).Decode(&myLoc)
	if err2 != nil {
		log.Fatal("error reading body", err2)
	}

	log.Printf("received: %v\n", myLoc) //prints user location to debug console in vscode

	latitude := fmt.Sprintf("%f", myLoc.Lat)
	longitude := fmt.Sprintf("%f", myLoc.Long)

	locationString := "location=" + latitude + "," + longitude

	url := "https://maps.googleapis.com/maps/api/place/nearbysearch/json?" + locationString + "&radius=1500&type=cafe&key=AIzaSyCug_XiU8cTDBlULG_BXe0UhYMgBkSSd9k"

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

	body, err := io.ReadAll(res.Body) // ALL PLACES API DATA IS STORED IN 'body'
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(string(body)) //prints to debug console in VS code

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
