import React from 'react'
import { Map as LeafletMap, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import axios from 'axios';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { chain, groupBy, reduce } from 'lodash';
class App extends React.Component {
  state = {
    data: null,
    mnSegements: null,
    isChecked: false
  }

  toggleChange = () => this.setState({ isChecked: !this.state.isChecked });

  sum = (total, item) => total + parseInt(item.WinProbability);

  findAverage = (items) => reduce(items, this.sum, 0) / items.length;

  componentDidMount() {
    axios.get('http://localhost:3001/showrooms').then(res => this.setState({ data: res.data }));
    // axios.get('http://localhost:3001/MN')
    //   .then(res => {
    //     const data = chain(res.data)
    //       .groupBy('Zip')
    //       .map((value, key) => ({ Zip: key, win_rate: this.findAverage(value).toFixed(2) })).value();
    //     this.setState({ winRate: data })
    //   });
    axios.get('http://localhost:3001/mn_segements').then(res => this.setState({ mnSegements: res.data }));
  }

  clusterColor = (val) => {
    switch (val) {
      case "value":

        break;

      default:
        break;
    }
  }

  render() {
    if (!this.state.data || !this.state.mnSegements) return null;
    return (
      <>
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
          <TileLayer
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
          <MarkerClusterGroup>
            {this.state.data.filter(show => show.State === 'MN').map(showroom => (
              <Marker position={[showroom.Lat, showroom.Lon]}>
                <Popup>
                  {`Pella Showroom of ${showroom.City}, ${showroom.State}`}
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>

          {this.state.isChecked &&
            // <MarkerClusterGroup>
            // {
            this.state.mnSegements.map(seg => (
              <CircleMarker center={[seg.lat, seg.lon]} radius={5} fillColor={'blue'} stroke={false}>
                <Popup>
                  {seg.Address}{seg.City}<br /><strong>{seg.cluster_number}</strong>
                </Popup>
              </CircleMarker>
            ))
            //   }
            // </MarkerClusterGroup>
          }
        </LeafletMap>
        <div style={{ position: 'fixed', right: 20, bottom: 20, zIndex: 1000, background: '#fff', padding: 10 }}>
          <input type="checkbox" checked={this.state.isChecked} onChange={this.toggleChange} />
          <label>Housing Segments (MN)</label>
        </div>
      </>
    );
  }
}

export default App;
