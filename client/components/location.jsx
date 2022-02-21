import React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import Geocode from 'react-geocode';
class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: null,
      lng: null
    };
    this.getCoordinates = this.getCoordinates.bind(this);
  }

  getCoordinates() {
    const address = this.props.postLocation;
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
        <div className="modal-container">
        <div className='home-page-container loading-map'>
          <div className="home-page">
            <div className='home-margin'>
              <div className="loading-container ">
                <div className="loading-circle loader">
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      );
    } else {
      return (
      <>
        <div className="modal-container">
          <div className="location-component flex justify-content-center">
            <div className="map-wrapper">
              <Map google={this.props.google} zoom={14} initialCenter={{
                lat: this.state.lat,
                lng: this.state.lng
              }}>
              <Marker onClick={this.onMarkerClick}
                name={'Current location'} />
              </Map>
            </div>
          </div>
        </div>
      </>
      );
    }
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBj9V_RJhLq9WQJOZccmLZKM-pymhhpnfE')
})(Location);
