import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    venues: []
  }

  componentDidMount() {
    this.getNearbyVenues()
    this.loadMap()
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
    }).catch(error => {
      console.log(error)
    })
  }

  initMap = () => {
    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 17.422937, lng: 78.6400627},
      zoom: 14
    });
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
