# Caffinder
A web paged map where users can easily find the locations, ratings, and popularity of coffee shops in any area. Caffinder is the perfect tool to help others looking for a good study-grind place while also drawing the much deserved attention to local businesses.

## Table of Contents
[Features](#Features)  
[Technologies](#Technologies)  
[Setup](#Setup)  
[Sources](#Sources)  
[Team](#Team)  

<a name="Features"/>

## Features

Home Page

<img width="564" alt="Screenshot 2023-04-19 201812" src="https://user-images.githubusercontent.com/91928954/233226211-479a9a1e-a956-49b5-a379-ea64f578810b.png">

Login Screen

<img width="564" alt="Screenshot 2023-04-19 202115" src="https://user-images.githubusercontent.com/91928954/233226423-20d526d2-f954-4ba1-aa59-595cba369858.png">

SideBar Component

<img width="564" alt="Screenshot 2023-04-19 202336" src="https://user-images.githubusercontent.com/91928954/233226618-7c34de76-e159-401a-8686-42a36954266b.png">

Favorites Panel

<img width="564" alt="Screenshot 2023-04-19 202439" src="https://user-images.githubusercontent.com/91928954/233226724-213fb628-db41-4075-b8d6-a420bcf6b94b.png">

Search Bar Autocompletion

<img width="1128" alt="Screenshot 2023-04-19 202629" src="https://user-images.githubusercontent.com/91928954/233226904-61df9dcb-01f8-4ef0-b26d-221e63e45f2b.png">

<a name="Technologies"/>

## Technologies
- Angular CLI: 15.2.6
- Node: 18.12.1
- Go: 1.19.5
- [Google Maps API](https://developers.google.com/maps)
- [Google Routes API](https://developers.google.com/maps/documentation/routes/overview)
- [Google Places API](https://developers.google.com/maps/documentation/places/web-service)
- [Google Autocomplete API](https://developers.google.com/maps/documentation/javascript/place-autocomplete)

<a name="Setup"/>

## Setup

To run this project, clone the repository and install dependencies locally:

```
$ cd .\myAngularProj\
$ npm install --force
$ npm i ngx-google-places-autocomplete --force
```

In the same terminal with the open `myAngularProj` directory, run the frontend:

```
$ ng s
```

Open a second, seperate terminal which should open into the directory and run the backend:

```
$ go run main.go
```

Find the running project on `http://localhost:4200/`.

<a name="Testing"/>

## Testing

To run cypress testing, open up a new terminal into the `myAngularProj` directory, and run the command:

```
$ npx cypress open
```

From there, the E2E and Component Testing are available and can be ran.

To run jasmine/karma tests, open up a new terminal into the `myAngularProj` directory, and run the command:

```
$ npm test
```

Or use the following alternative command to run jasmine/karma tests:

```
$ ng test
```

From there, the component tests are ran.


<a name="Sources"/>

## Sources

<a name="Team"/>

- [Google Maps Directions Service](https://developers.google.com/maps/documentation/javascript/directions)
- [How To Integrate Google Places Autocomplete in Angular 2022](https://www.ultimateakash.com/blog-details/Ii0zYGAKYAo=/How-To-Integrate-Google-Places-Autocomplete-in-Angular-2022)
- [Sharing data between child and parent directives and components](https://angular.io/guide/inputs-outputs)
- [Place Photos](https://developers.google.com/maps/documentation/places/web-service/photos)

## Team
Lauren Escarcha, Karen Tong, Saloni Karanth, Justus Geslani
