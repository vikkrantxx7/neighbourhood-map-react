import React, { Component } from 'react';
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import './App.css';

//Main component to hold navbar, sidebar, map
class App extends Component {

  state = {
    venues: [], //holds venue data fetched from FourSquare API
    markers: [], //holds all the markers on map
    filteredVenues: [], //holds the venues after applying filter based on provided query 
    query: '', //holds the query from filter box
    toggleVal: true //flag to toggle sidebar and close button
  }

  //get nearby venues on component mount
  componentDidMount() {
    this.getNearbyVenues()
  }

  //show/hide the sidebar
  toggleSidebar = (value) => {
    this.setState({
      toggleVal: !value
    })
    if(this.state.toggleVal) {
      window.document.getElementById('sidebar').style.left = '0px'
      window.document.getElementById('sidebar').style.visibility = 'visible'
    }
    else {
      window.document.getElementById('sidebar').style.left = '-400px'
      window.document.getElementById('sidebar').style.visibility = 'hidden'
    }
  }

  //open sidebar on pressing enter on focused nav button
  navKeyPress = (event, value) => {
    var code = event.keyCode || event.which
    if(code === 13) {
      this.toggleSidebar(value)
    }
  }

  //zoom on the marker related to the list item on pressing enter
  listKeyPress = (event, venue) => {
    var code = event.keyCode || event.which
    if(code === 13) {
      this.clickList(venue)
    }
  }

  //load the google map api asynchronously by creating and putting script tag
  loadMap = () => {
    window.initMap = this.initMap
    var index = window.document.getElementsByTagName('script')[0]
    var script = window.document.createElement('script')
    script.src = "https://maps.googleapis.com/maps/api/js?libraries=geometry&key=AIzaSyB9ggWWErnMrBBV2581LSTZVWxhB7BbylQ&callback=initMap"
    script.async = true
    script.defer = true
    index.parentNode.insertBefore(script, index)
  }

  //show/hide markers passing the query and create filteredVenues list that includes only those
  //venues whose name includes the provided query
  filterVenues = (query) => {
    query = query.trim()
    this.setState({
      query,
      filteredVenues: query ? this.state.venues.filter(venue => venue.venue.name.toLowerCase().includes(query.toLowerCase())) : this.state.venues
    },() => console.log("Showing ", this.state.filteredVenues.length, " places."))
    this.state.markers.forEach(marker => {
      if(!marker.title.toLowerCase().includes(query.toLowerCase())){
        marker.setVisible(false)
      } else {
        marker.setVisible(true)
      }
    })
  }

  //get all the nearby venues using FourSquare API. It returns 30 results.
  getNearbyVenues = () => {
    window.fetch('https://api.foursquare.com/v2/venues/explore?client_id=LRQXKPJ21ZWDLMSIF0A3QI2H23EBUFZM2WE0WTHL2CMIILBC&client_secret=NAHU30SNZJMVDM2SBG33ZTVAP1K5LBUJOKTSH3PDTI4KCHNI&v=20180323&near=hyderabad').then(response => {
      return response.json()
    }).then(json => {
      this.setState({
        venues: json.response.groups[0].items,
        filteredVenues: json.response.groups[0].items
      },() => console.log("Showing ", this.state.filteredVenues.length, " places."))
      this.loadMap()
    }).catch(error => {
      console.log(error)
    })
  }

  //initMap function to initialize the map and markers
  initMap = () => {
    var markers = [], bounds = new window.google.maps.LatLngBounds(), infoWindow = new window.google.maps.InfoWindow()
    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 17.422316, lng: 78.4741774},
      zoom: 14
    });
    console.log(this.state.venues)
    markers = this.state.venues.map(venue => {
      var marker = new window.google.maps.Marker({
        position: {lat: venue.venue.location.lat, lng: venue.venue.location.lng},
        map: map,
        animation: window.google.maps.Animation.DROP,
        title: venue.venue.name,
        id: venue.venue.id
      })
      marker.addListener('click', () => {
        marker.setAnimation(window.google.maps.Animation.BOUNCE)
        setTimeout(() => {
          marker.setAnimation(null)
        }, 1000)
        populateInfowindow(marker, infoWindow, venue)
      })
      bounds.extend(marker.position)
      return marker
    })
    this.setState({
      markers
    })
    map.fitBounds(bounds)

    //this updates the infoWindow content with streetView panorama if it is defined
    function populateInfowindow(marker, infoWindow, venue) {
      var streetViewService = new window.google.maps.StreetViewService()
      var radius = 50
      function getStreetView(data, status) {
        if(status === window.google.maps.StreetViewStatus.OK) {
          var nearStreetViewLocation = data.location.latLng
          var heading = window.google.maps.geometry.spherical.computeHeading(nearStreetViewLocation, marker.position)
          infoWindow.setContent('<div>' +
            '<h4>' + venue.venue.name + '</h4>' +
            '<p>' + venue.venue.location.formattedAddress.join('<br>') + '</p>' +
            '</div><div id="pano"></div>')
          var panoramaOptions = {
            position: nearStreetViewLocation,
            pov: {
              heading: heading,
              pitch: 30
            }
          }
          new window.google.maps.StreetViewPanorama(window.document.getElementById('pano'), panoramaOptions)
        } else {
          infoWindow.setContent('<div>' +
            '<h4>' + venue.venue.name + '</h4>' +
            '<p>' + venue.venue.location.formattedAddress.join('<br>') + '</p>' +
            '</div>')
        }
      }
      streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView)
      map.setZoom(15)
      map.setCenter(marker.position)
      infoWindow.open(map, marker)
    }
  }

  //selects the marker on clicking a list item by trigerring click on marker
  clickList = (venue) => {
    var marker = this.state.markers.filter(marker => marker.id === venue.venue.id)[0]
    window.google.maps.event.trigger(marker,'click')
  }

  render() {
    return (
      <div>
        <Navbar toggleSidebar={this.toggleSidebar} toggleVal={this.state.toggleVal} navKeyPress={this.navKeyPress}/>
        <Sidebar filterVenues={this.filterVenues} filteredVenues={this.state.filteredVenues} clickList={this.clickList} query={this.state.query} listKeyPress={this.listKeyPress}/>
        <main>
          <div id="map"></div>
        </main>
      </div>
    );
  }
}

export default App;
