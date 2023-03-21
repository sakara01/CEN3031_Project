package main

import (
	"fmt"
	"log"
	"net/http"
	"net/http/httptest"
	"os"
	"strings"
	"testing"
)

// - receives user's location from front end (hardcoded)
// - checks if status is okay
// - checks if the name of a specified coffee shop is accurate
func TestPostHandler(t *testing.T) {
	//mockBody := "{\"lat\":25.7617,\"lng\":-80.1918}" //put any coordinates here, will see corresponding data in debug console
	mockBody := "{\"lat\":28.878060,\"lng\":-82.035319}" //put any coordinates here, will see corresponding data in debug console
	myReader := strings.NewReader(mockBody)
	req, err := http.NewRequest("POST", "/", myReader)
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(postHandler)

	handler.ServeHTTP(rr, req) //sends mock request to backend

	//to check if status code is okay
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v, want %v", status, http.StatusOK)
	}

	expected := `"name":"MizKathi'sCotillionSouthernCafe"`
	body := strings.ReplaceAll(strings.ReplaceAll(rr.Body.String(), " ", ""), "\n", "")
	result1 := strings.Index(body, `"name"`)
	shopNameGot := body[result1:520] //get substring of body from index onward

	if shopNameGot != expected {
		t.Errorf("handler returned unexpected body: got %v want %v",
			shopNameGot, expected)
	}

}

// checking for error: tests what happens if user location is NOT found
//   - location results in default Google HQ location (null)
//   - array of coffee shops should be empty bc of it
func TestPostHandlerEmptyLoc(t *testing.T) {
	mockBody := "{}" //no coordinates = user location not found
	myReader := strings.NewReader(mockBody)
	req, err := http.NewRequest("POST", "/", myReader)
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(postHandler)

	handler.ServeHTTP(rr, req) //sends mock request to backend

	//to check if status code is okay
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v, want %v", status, http.StatusOK)
	}

	//should have no results for nearby coffee shops
	expected := `"status" : "ZERO_RESULTS"`
	body := rr.Body.String()
	result1 := strings.Index(body, `"status"`)
	statusGot := body[result1:78] //get substring of body from index onward

	if statusGot != expected {
		t.Errorf("handler returned unexpected body: got %v want %v",
			statusGot, expected)
	}

}

func TestCreateHandlerNew(t *testing.T) {
	//test if new user is added correctly
	mockBody := "{\"username\":\"user1234\",\"password\":\"pass1234\"}" //put any coordinates here, will see corresponding data in debug console
	myReader := strings.NewReader(mockBody)
	req, err := http.NewRequest("POST", "/create", myReader)
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(createHandler)

	handler.ServeHTTP(rr, req) //sends mock request to backend

	//to check if status code is okay
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v, want %v", status, http.StatusOK)
	}

	expected := []byte(`{"status": "userAdded"}`)
	fmt.Println(string(rr.Body.Bytes()))

	if string(rr.Body.Bytes()) != string(expected) {
		t.Errorf("handler returned unexpected body: got %v want %v",
			rr.Body.Bytes(), expected)
	}

	//reset usernames.txt
	e := os.Remove("usernames.txt")
	if e != nil {
		log.Fatal(e)
	}

	f, err := os.OpenFile("usernames.txt", os.O_APPEND|os.O_WRONLY|os.O_CREATE, 0600)
	if err != nil {
		fmt.Print("There has been an error reading a file!: ", err)
		panic(err)
	}

	defer f.Close()

	if _, err = f.WriteString("sakara|pass123" + "\n" + "makara|umpass2" + "\n" + "example|lolpass" + "\n" + "asdf|asdf" + "\n"); err != nil {
		panic(err)
	}

}

func TestCreateHandlerExisting(t *testing.T) {
	//test if existing user is found correctly
	mockBody := "{\"username\":\"asdf\",\"password\":\"asdf\"}" //put any coordinates here, will see corresponding data in debug console
	myReader := strings.NewReader(mockBody)
	req, err := http.NewRequest("POST", "/create", myReader)
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(createHandler)

	handler.ServeHTTP(rr, req) //sends mock request to backend

	//to check if status code is okay
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v, want %v", status, http.StatusOK)
	}

	expected := []byte(`{"status": "userAlreadyExists"}`)
	fmt.Println(string(rr.Body.Bytes()))

	if string(rr.Body.Bytes()) != string(expected) {
		t.Errorf("handler returned unexpected body: got %v want %v",
			string(rr.Body.Bytes()), expected)
	}
}

func TestFavoriteHandler(t *testing.T) {
	//test if new user is added correctly
	mockBody := "{\"username\":\"user1234\",\"placeid\":\"nvm\",\"name\":\"Starbucks\",\"photoref\":\"https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&photo_reference=AUjq9jnNU8GQYyQYyWxCxFAAom92htZkHD0kOtE6KwR_FMn9ig1u0cw1V93QifmmIZSoBVtd9GGfLOmze_z0l2Gw_Q-BbbkpHgu9x-3X_Q3kXRclgG9D9Ap__AzjjeNKtnp0Do3r_onb1AIG62dEnxD7ZQqRkzH2WH6WhRtklrx5i279odlm&key=AIzaSyCug_XiU8cTDBlULG_BXe0UhYMgBkSSd9k\"}" //put any coordinates here, will see corresponding data in debug console
	myReader := strings.NewReader(mockBody)
	req, err := http.NewRequest("POST", "/favorite", myReader)
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(favoriteHandler)

	handler.ServeHTTP(rr, req) //sends mock request to backend

	//to check if status code is okay
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v, want %v", status, http.StatusOK)
	}

	expected := []byte(`{"status": "favAdded"}`)
	fmt.Println(string(rr.Body.Bytes()))

	if string(rr.Body.Bytes()) != string(expected) {
		t.Errorf("handler returned unexpected body: got %v want %v",
			rr.Body.Bytes(), expected)
	}

	//reset usernames.txt
	e := os.Remove("usernames.txt")
	if e != nil {
		log.Fatal(e)
	}

	f, err := os.OpenFile("usernames.txt", os.O_APPEND|os.O_WRONLY|os.O_CREATE, 0600)
	if err != nil {
		fmt.Print("There has been an error reading a file!: ", err)
		panic(err)
	}

	defer f.Close()

	if _, err = f.WriteString("sakara|pass123" + "\n" + "makara|umpass2" + "\n" + "example|lolpass" + "\n" + "asdf|asdf" + "\n"); err != nil {
		panic(err)
	}

}
