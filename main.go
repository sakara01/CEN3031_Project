package main

import (
	"bufio"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
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
	Password string `json:"password"`
}

type Shop struct {
	Placeid  string `json:"placeid"`
	Name     string `json:"name"`
	Photoref string `json:"photoref"`
}

type Favorite struct {
	Username string `json:"username"`
	Placeid  string `json:"placeid"`
	Name     string `json:"name"`
	Photoref string `json:"photoref"`
}

type AllShops struct {
	AllMyShops []Shop `json:"allMyShops"`
}

func main() { //starts server using go's http package
	mux := mux.NewRouter()
	mux.HandleFunc("/login", loginHandler).Methods("POST", "OPTIONS")
	mux.HandleFunc("/create", createHandler).Methods("POST", "OPTIONS")
	mux.HandleFunc("/favorite", favoriteHandler).Methods("POST", "OPTIONS")
	mux.HandleFunc("/request", requestHandler).Methods("POST", "OPTIONS")
	mux.HandleFunc("/directions", directionsHandler).Methods("POST", "OPTIONS")
	mux.HandleFunc("/", postHandler).Methods("POST", "OPTIONS")
	http.ListenAndServe(":8080", mux)
}

func enableCors(w *http.ResponseWriter) { //allows frontend and backend to communicate
	(*w).Header().Add("Access-Control-Allow-Origin", "*")
	(*w).Header().Add("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS")
	(*w).Header().Add("Access-Control-Allow-Headers", "access-control-allow-origin, Content-Type")
	(*w).Header().Add("Access-Control-Allow-Credentials", "true")
}

// finds user location
// then gets the nearby places around location coordinates
// filter nearby places in the url
func postHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)

	buf := new(strings.Builder)
	_, err := io.Copy(buf, r.Body)

	var myLoc Location
	json.Unmarshal([]byte(buf.String()), &myLoc)

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
		panic(err)
	}

	res, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer res.Body.Close()

	body, err := io.ReadAll(res.Body) // ALL PLACES API DATA IS STORED IN 'body'
	if err != nil {
		panic(err)
	}

	w.Header().Set("Content-Type", "application/json") //sets localhost:8080 to display json

	w.Write(body) //writes json data to localhost:8080

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
		panic(err)
	}

	loginString := buf.String()
	var user1 Login

	json.Unmarshal([]byte(loginString), &user1) // user1.Username has username
	var shopData []byte

	if checkUser(user1.Username, user1.Password) {
		shopData = []byte(`{"status": "userExists"}`)
	} else {
		shopData = []byte(`{"status": "noUser"}`)
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(shopData)

}

func createHandler(w http.ResponseWriter, r *http.Request) {
	(w).Header().Add("Access-Control-Allow-Origin", "*")
	(w).Header().Add("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS")
	(w).Header().Add("Access-Control-Allow-Headers", "access-control-allow-origin, Content-Type")
	(w).Header().Add("Access-Control-Allow-Credentials", "true")

	//for some reason this version of stringifying and decoding works much better and doesnt cause cors errors.
	buf := new(strings.Builder)
	_, err := io.Copy(buf, r.Body)
	if err != nil {
		panic(err)
	}

	loginString := buf.String()
	var user1 Login

	json.Unmarshal([]byte(loginString), &user1) // user1.Username has username
	var shopData []byte

	if checkUser(user1.Username, user1.Password) {
		//user Exists
		shopData = []byte(`{"status": "userAlreadyExists"}`)
	} else {
		//add user to db
		addUser(user1.Username, user1.Password)
		shopData = []byte(`{"status": "userAdded"}`)
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(shopData)

}

func requestHandler(w http.ResponseWriter, r *http.Request) {
	(w).Header().Add("Access-Control-Allow-Origin", "*")
	(w).Header().Add("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS")
	(w).Header().Add("Access-Control-Allow-Headers", "access-control-allow-origin, Content-Type")
	(w).Header().Add("Access-Control-Allow-Credentials", "true")

	//for some reason this version of stringifying and decoding works much better and doesnt cause cors errors.
	buf := new(strings.Builder)
	_, err := io.Copy(buf, r.Body)
	if err != nil {
		panic(err)
	}

	loginString := buf.String()
	var user1 Login

	json.Unmarshal([]byte(loginString), &user1) // user1.Username has username

	shopData := returnUserData(user1.Username)

	w.Header().Set("Content-Type", "application/json")
	w.Write(shopData)

}

func favoriteHandler(w http.ResponseWriter, r *http.Request) {
	(w).Header().Add("Access-Control-Allow-Origin", "*")
	(w).Header().Add("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS")
	(w).Header().Add("Access-Control-Allow-Headers", "access-control-allow-origin, Content-Type")
	(w).Header().Add("Access-Control-Allow-Credentials", "true")

	//for some reason this version of stringifying and decoding works much better and doesnt cause cors errors.
	buf := new(strings.Builder)
	_, err := io.Copy(buf, r.Body)
	if err != nil {
		panic(err)
	}

	loginString := buf.String()
	var myFav Favorite

	json.Unmarshal([]byte(loginString), &myFav) // user1.Username has username
	var shopData []byte

	if addFavorite(myFav) {
		shopData = []byte(`{"status": "favAdded"}`)
	} else {
		shopData = []byte(`{"status": "alreadyFav"}`)
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(shopData)

}

func directionsHandler(w http.ResponseWriter, r *http.Request) {
	(w).Header().Add("Access-Control-Allow-Origin", "*")
	(w).Header().Add("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS")
	(w).Header().Add("Access-Control-Allow-Headers", "access-control-allow-origin, Content-Type")
	(w).Header().Add("Access-Control-Allow-Credentials", "true")

	//for some reason this version of stringifying and decoding works much better and doesnt cause cors errors.
	buf := new(strings.Builder)
	_, err := io.Copy(buf, r.Body)
	if err != nil {
		panic(err)
	}

	urlStr := buf.String()
	fmt.Println(urlStr)

	var myUrl = fmt.Sprintf("%s", urlStr)

	//request nearby places data from Places API
	client := &http.Client{}
	// Create a GET request
	req, err := http.NewRequest("GET", myUrl, nil)
	if err != nil {
		fmt.Println("Failed to create request:", err)
		return
	}

	// Send the GET request
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Failed to send request:", err)
		return
	}
	defer resp.Body.Close()

	// Read the response body
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Println("Failed to read response body:", err)
		return
	}

	var shopData []byte

	shopData = []byte(body)

	w.Header().Set("Content-Type", "application/json")
	w.Write(shopData)

}

func addFavorite(myFav Favorite) bool {
	f, err := os.OpenFile("users.txt", os.O_APPEND|os.O_CREATE, 0600)
	if err != nil {
		panic(err)
	}
	defer f.Close()

	var matched bool = false

	scanner := bufio.NewScanner(f)
	for scanner.Scan() {
		line := scanner.Bytes()
		lineStr := strings.Split(string(line), "|")
		if lineStr[0] == myFav.Username && lineStr[1] == myFav.Placeid && lineStr[2] == myFav.Name {
			matched = true
			//return false if shop already favorited and nothing is added
		}
	}

	if matched == true {
		return false
	} else if matched == false {
		if _, err = f.WriteString(myFav.Username + "|" + myFav.Placeid + "|" + myFav.Name + "|" + myFav.Photoref + "\n"); err != nil {
			panic(err)
		}
		//return true if favorite successfully added
		return true
	}
	return false
}

func returnUserData(username string) []byte {

	f, err := os.Open("users.txt")
	if err != nil {
		panic(err)
	}
	defer f.Close()

	var myCafe Shop
	var omgShops AllShops

	scanner := bufio.NewScanner(f)
	for scanner.Scan() {
		line := scanner.Bytes()
		lineStr := strings.Split(string(line), "|")
		if lineStr[0] == username {
			myCafe.Placeid = lineStr[1]
			myCafe.Name = lineStr[2]
			myCafe.Photoref = lineStr[3]
			omgShops.AllMyShops = append(omgShops.AllMyShops, myCafe)
		}
	}

	if len(omgShops.AllMyShops) == 0 {
		out := []byte(`{"allMyShops": "empty"}`)
		return out
	}

	out, _ := json.Marshal(&omgShops)
	return out
}

func checkUser(username string, password string) bool {
	f, err := os.Open("usernames.txt")
	if err != nil {
		fmt.Print("There has been an error reading a file!: ", err)
		panic(err)
	}
	defer f.Close()

	scanner := bufio.NewScanner(f)
	for scanner.Scan() {
		line := scanner.Bytes()
		lineStr := strings.Split(string(line), "|")
		if lineStr[0] == username && lineStr[1] == password {
			return true
		}
	}
	return false
}

func addUser(username string, password string) {
	f, err := os.OpenFile("usernames.txt", os.O_APPEND|os.O_WRONLY|os.O_CREATE, 0600)
	if err != nil {
		fmt.Print("There has been an error reading a file!: ", err)
		panic(err)
	}

	defer f.Close()

	if _, err = f.WriteString(username + "|" + password + "\n"); err != nil {
		panic(err)
	}
}
