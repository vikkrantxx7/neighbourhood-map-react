# Neighbourhood Map Project

I just love my neighbourhood. So does everyone. Let's play with this REACT application which presents nearby awesome venues and related information using Google Maps and FourSquare APIs.

## Table of Contents

* [Getting Started](#gettingstarted)
* [How To](#howto)
* [Features](#features)
* [Dependencies](#dependencies)
* [Authors](#authors)

### GettingStarted

To run this awesome app. Just clone the repo(or fork and then clone) and in the project folder run `npm install` to install all the dependencies and then type `npm start` to start the server.

### HowTo

The homepage displays -
* Navigation Bar
* Map container

Google map shows a group of markers at some nearby place which is provided along with FourSquare API in `App.js`. Total number of venues returned are 30.<br>
Venues' location is used to generate respective markers on map. To filter the markers click on hamburger button to open the sidebar where you can type in the restaurant name to filter the markers and sidebar list.<br>
To get address info on the venue just click the marker or tap the list item and you are presented with address and StreetView Panorama of the place.<br>
Use tabs and enter as this is totally accessible. Once you have navigated online, try offline too.

So cool, right? So what are you waiting for ? Go - Play around !!

### Features

* Responsive- Mobile friendly.
* Accessible- Proper focus and ARIA.
* Offline- ServiceWorker helps to cache the request/response for offline use.

### Dependencies

[create react app](https://github.com/facebook/create-react-app)- Used to bootstrap the whole project.<br>
[react-debounce-input](https://www.npmjs.com/package/react-debounce-input)- React component that renders an Input, Textarea or other element with debounced onChange.<br>
[FourSquare API](https://developer.foursquare.com/docs)- Used to get additional information on nearby venues.<br>
[Google Maps API](https://developers.google.com/maps/documentation/javascript/tutorial)- Provides area map to play with. Markers, InfoWindow, Panorama view and much more.

### Authors

* [Vikrant Sharma](https://github.com/vikkrantxx7) - Filled with lovely React.
