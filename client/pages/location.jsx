import React from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: true
    };
  }

  render() {
    return (
      <>
      <div id="map" ></div>
        <Map google={this.props.google} zoom={14} initialCenter={{
          lat: 33.880507794384975,
          lng: -118.31463590118855
        }}>

        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />

        <InfoWindow onClose={this.onInfoWindowClose}>
            {/* <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div> */}
        </InfoWindow>
      </Map>
      </>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBj9V_RJhLq9WQJOZccmLZKM-pymhhpnfE')
})(Location);
