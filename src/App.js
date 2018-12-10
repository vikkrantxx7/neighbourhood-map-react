import React, { Component } from 'react';
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import './App.css';

class App extends Component {

  state = {
    venues: [],
    markers: [],
    filteredVenues: [],
    toggleVal: true
  }

  componentDidMount() {
    this.getNearbyVenues()
  }

  toggleSidebar = (value) => {
    this.setState({
      toggleVal: !value
    })
    if(this.state.toggleVal)
      window.document.getElementById('sidebar').style.left = '0px'
    else
      window.document.getElementById('sidebar').style.left = '-400px'
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

  filterVenues = (query) => {
    this.setState({
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

  initMap = () => {
    var markers = [], bounds = new window.google.maps.LatLngBounds(), infoWindow = new window.google.maps.InfoWindow()
    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 17.422316, lng: 78.4741774},
      zoom: 14
    });
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
        infoWindow.setContent(this.populateContent(venue))
        map.setZoom(15)
        map.setCenter(marker.position)
        infoWindow.open(map, marker)
      })
      bounds.extend(marker.position)
      return marker
    })
    this.setState({
      markers
    })
    map.fitBounds(bounds)
  }

  clickList = (venue) => {
    var marker = this.state.markers.filter(marker => marker.id === venue.venue.id)[0]
    window.google.maps.event.trigger(marker,'click')
  }

  populateContent = (venue) => {
    return '<div>' +
    '<h4>' + venue.venue.name + '</h4>' +
    '<p>' + venue.venue.location.formattedAddress.join('<br>') + '</p>' +
    '</div>'
  }

  render() {
    return (
      <div>
        <Navbar toggleSidebar={this.toggleSidebar} toggleVal={this.state.toggleVal}/>
        <Sidebar filterVenues={this.filterVenues} filteredVenues={this.state.filteredVenues} clickList={this.clickList}/>
        <main>
          <div id="map"></div>
        </main>
      </div>
    );
  }
}

export default App;
