package main

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

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
		t.Errorf("handler returned unexpected body: got (((%v))) want (((%v)))",
			shopNameGot, expected)
	}

}
