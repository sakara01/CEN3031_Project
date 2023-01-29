package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type myData struct { //test struct, replace soon
	Title  string
	Body   string
	UserId int
}

func main() { //starts server using go's http package
	http.HandleFunc("/", handler)
	http.ListenAndServe(":8080", nil)

}

func enableCors(w *http.ResponseWriter) { //allows frontend and backend to communicate
	(*w).Header().Set("Access-Control-Allow-Origin", "http://localhost:4200")
}

func handler(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)

	/*	//allows backend to read data from frontend
		newData := []myData{}

		jsn, err := io.ReadAll(r.Body)
		if err != nil {
			log.Fatal("error reading body", err)
		}

		err = json.Unmarshal(jsn, &newData)
		if err != nil {
			log.Fatal("decoding error: ", err)
		}

		log.Printf("received: %v\n", newData)
	*/

	oneData := []myData{ //test data, replace soon
		{"Test1111", "one", 12},
		{"Test2222", "two", 13},
		{"Test3333", "three", 14},
	}

	finalJson, err := json.Marshal(oneData) //encodes json data to send to frontend
	if err != nil {
		fmt.Fprintf(w, "Error: %s", err)
	}

	w.Header().Set("Content-Type", "application/json")

	w.Write(finalJson) //writes json data to localhost:8080

}
