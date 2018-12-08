import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    venues: []
  }

  componentDidMount() {
    this.getNearbyVenues()
  }

  loadMap = () => {
    window.initMap = this.initMap
    var index = window.document.getElementsByTagName('script')[0]
    var script = window.document.createElement('script')
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyB9ggWWErnMrBBV2581LSTZVWxhB7BbylQ&callback=initMap"
    script.async = true
    script.defer = true
    index.parentNode.insertBefore(script, index)
  }

  getNearbyVenues = () => {
    window.fetch('https://api.foursquare.com/v2/venues/explore?client_id=LRQXKPJ21ZWDLMSIF0A3QI2H23EBUFZM2WE0WTHL2CMIILBC&client_secret=NAHU30SNZJMVDM2SBG33ZTVAP1K5LBUJOKTSH3PDTI4KCHNI&v=20180323&ll=17.422937,78.6400627&radius=8000').then(response => {
      return response.json()
    }).then(json => {
      this.setState({
        venues: json.response.groups[0].items
      })
      this.loadMap()
    }).catch(error => {
      console.log(error)
    })
  }

  initMap = () => {
    var markers = [], bounds = new window.google.maps.LatLngBounds(), infoWindow = new window.google.maps.InfoWindow()
    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 17.422937, lng: 78.6400627},
      zoom: 14
    });

    markers = this.state.venues.map(venue => {
      var marker = new window.google.maps.Marker({
        position: {lat: venue.venue.location.lat, lng: venue.venue.location.lng},
        map: map,
        animation: window.google.maps.Animation.DROP
      })
      marker.addListener('click', () => {
        infoWindow.setContent(venue.venue.name)
        infoWindow.open(map, marker)
      })
      bounds.extend(marker.position)
      return marker
    })
    map.fitBounds(bounds)
  }

  render() {
    return (
      <main>
        <div id="map"></div>
      </main>
    );
  }
}

export default App;
