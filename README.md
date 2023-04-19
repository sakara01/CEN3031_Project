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

<a name="Technologies"/>

## Technologies
- Angular CLI: 15.2.6
- Node: 18.12.1
- Go: 1.19.5
- [Google Maps API](https://developers.google.com/maps)
- [Google Routes API](https://developers.google.com/maps/documentation/routes/overview)
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

INCLUDE SCREENSHOTS OF RUNNING PROJECT

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

From there, the component tests are ran.


<a name="Sources"/>

## Sources

<a name="Team"/>

- [Google Maps Directions Service](https://developers.google.com/maps/documentation/javascript/directions)

## Team
Lauren Escarcha, Karen Tong, Saloni Karanth, Justus Geslani
