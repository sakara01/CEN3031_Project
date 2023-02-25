package main

///This file may not be needed! only for unit testing the backend!
import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

func TestPostHandler(t *testing.T) {
	mockBody := "{\"lat\":25.7617,\"lng\":-80.1918}" //put any coordinates here, will see corresponding data in debug console
	myReader := strings.NewReader(mockBody)
	req, err := http.NewRequest("POST", "/", myReader)
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(postHandler)

	handler.ServeHTTP(rr, req)

	//to check if status code is okay
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v, want %v", status, http.StatusOK)
	}

}
