import React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import Geocode from 'react-geocode';
class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: true,
      lat: null,
      lng: null
    };
    this.getCoordinates = this.getCoordinates.bind(this);
  }

  getCoordinates() {
    const address = this.props.paramsPostLocation;
    Geocode.setApiKey('AIzaSyBj9V_RJhLq9WQJOZccmLZKM-pymhhpnfE');
    Geocode.fromAddress(address).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        this.setState({
          lat: lat,
          lng: lng
        });
      },
      error => {
        console.error(error);
      }
    );
  }

  componentDidMount() {
    this.getCoordinates();
  }

  render() {
    if (!this.state.lat || !this.state.lng) {
      return (
        <div>shit</div>
      );
    } else {
      return (
      <>
      <div id="map"></div>
        <Map google={this.props.google} zoom={14} initialCenter={{
          lat: this.state.lat,
          lng: this.state.lng
        }}>

        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />
{/*
        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow> */}
      </Map>
      </>
      );
    }
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBj9V_RJhLq9WQJOZccmLZKM-pymhhpnfE')
})(Location);
