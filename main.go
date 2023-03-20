package main

import (
	"bufio"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
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

type Shop struct {
	Placeid  string `json:"placeid"`
	Name     string `json:"name"`
	Photoref string `json:"photoref"`
}

type AllShops struct {
	AllMyShops []Shop `json:"allMyShops"`
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
	//fmt.Println(buf.String())

	var myLoc Location
	json.Unmarshal([]byte(buf.String()), &myLoc)

	//fmt.Println(myLoc.Lat)

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

	//for some reason this version of stringifying and decoding works much better and doesnt cause cors errors.
	buf := new(strings.Builder)
	_, err := io.Copy(buf, r.Body)
	if err != nil {
		fmt.Println(err)
		return
	}

	//fmt.Println(buf.String())
	loginString := buf.String()
	var user1 Login

	json.Unmarshal([]byte(loginString), &user1) // user1.Username has username
	var shopData []byte

	if checkUser(user1.Username) {
		shopData = returnUserData(user1.Username)
	} else {
		shopData = []byte(`{"allMyShops": "noUser"}`)
	}

	//TODO: return array of favorited coffee shops or something. maybe {shops: [cafe1,cafe2,cafe3]} idk
	w.Header().Set("Content-Type", "application/json") //sets localhost:8080 to display json
	w.Write(shopData)                                  //writes json data to localhost:8080

}

func updateDB() {
	//to add a new user
	f, err := os.OpenFile("users.txt", os.O_APPEND|os.O_WRONLY|os.O_CREATE, 0600)
	if err != nil {
		panic(err)
	}

	defer f.Close()

	if _, err = f.WriteString("username" + " " + "place id" + "name" + "photo ref" + "\n"); err != nil {
		panic(err)
	}

}

func returnUserData(username string) []byte {
	//fmt.Println("this is username:" + username)

	f, err := os.Open("users.txt")
	if err != nil {
		fmt.Print("There has been an error!: ", err)
	}
	defer f.Close()

	var myCafe Shop
	var omgShops AllShops

	scanner := bufio.NewScanner(f)
	for scanner.Scan() {
		line := scanner.Bytes()
		lineStr := strings.Split(string(line), "|")
		if lineStr[0] == username { //replace sakara with dynamically receieved username
			myCafe.Placeid = lineStr[1]
			myCafe.Name = lineStr[2]
			myCafe.Photoref = lineStr[3]
			omgShops.AllMyShops = append(omgShops.AllMyShops, myCafe)
		}
	}

	//fmt.Println(omgShops)
	out, _ := json.Marshal(&omgShops)
	return out
}

func checkUser(username string) bool {
	f, err := os.Open("usernames.txt")
	if err != nil {
		fmt.Print("There has been an error!: ", err)
		panic(err)
	}
	defer f.Close()

	scanner := bufio.NewScanner(f)
	for scanner.Scan() {
		line := scanner.Bytes()
		if string(line) == username { //replace sakara with dynamically receieved username
			return true
		}
	}
	return false
}
