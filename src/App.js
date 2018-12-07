import React, { Component } from 'react';
import './App.css';

class App extends Component {
  componentDidMount() {
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
