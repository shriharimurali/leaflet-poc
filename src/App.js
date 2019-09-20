import React from 'react'
// import Choropleth from 'react-leaflet-choropleth'
import { Map as LeafletMap, TileLayer, Marker } from 'react-leaflet';
import axios from 'axios';
// import fetchStream from 'fetch-readablestream';
// import ndjsonStream from 'can-ndjson-stream';
import MarkerClusterGroup from 'react-leaflet-markercluster';

// const style = {
//   fillColor: '#F28F3B',
//   weight: 2,
//   opacity: 1,
//   color: 'white',
//   dashArray: '3',
//   fillOpacity: 0.5
// }

class App extends React.Component {
  state = {
    data: null
  }

  componentDidMount() {
    // fetchStream('http://localhost:4000/')
    //   .then(res => this.readAllChunks(res.body))
    //   .then(chunks => console.dir('done'))

    axios.get('http://localhost:3001/coords').then(res => this.setState({ data: res.data }));
  }

  // readAllChunks = (readableStream) => {
  //   const reader = readableStream.getReader();
  //   const decoder = new TextDecoder('utf-8')
  //   const chunks = [];
  //   const pump = () => {
  //     return reader.read().then(({ value, done }) => {
  //       if (done) {
  //         return chunks;
  //       }
  //       console.log(decoder.decode(value))
  //       console.log('next')
  //       chunks.push(decoder.decode(value));
  //       console.log(chunks);
  //       return pump();
  //     });
  //   }
  //   return pump();
  // }

  render() {
    // this.state.data && this.state.data.features.slice(0, 10).map((f, i) => console.log(f))
    if (!this.state.data) return null;
    console.log(this.state.data);
    return (
      <LeafletMap
        center={[39.82, -98.58]}
        zoom={4}
        maxZoom={20}
        attributionControl={true}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        easeLinearity={0.35}
        style={{ height: '100vh' }}
      >
        {/* <GeoJSON
          data={this.state.data}
          key="geojson-key"
          style={() => ({
            color: '#4a83ec',
            weight: 0.5,
            fillColor: "#1a1d62",
            fillOpacity: 1,
          })}
        /> */}
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <MarkerClusterGroup>
          {this.state.data.features.map((f, i) => (
            <Marker position={[f.geometry.coordinates[1], f.geometry.coordinates[0]]} />
          ))}
        </MarkerClusterGroup>
        {/* <Choropleth
          data={this.state.data}
          valueProperty={(feature) => feature.properties.Timezone}
          visible={(feature) => feature.id}
          scale={['Green', 'Red']}
          steps={7}
          mode='e'
          style={style}
          onEachFeature={(feature, layer) => layer.bindPopup(feature.properties.Timezone)}
          ref={(el) => this.choropleth = el.leafletElement}
        /> */}
      </LeafletMap>
    );
  }
}

export default App;
