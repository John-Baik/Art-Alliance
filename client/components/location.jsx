import React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import Geocode from 'react-geocode';
class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: null,
      lng: null,
      errorPage: null
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
        this.setState({ errorPage: true });
        console.error(error);
      }
    );
  }

  componentDidMount() {
    this.getCoordinates();
  }

  render() {
    if (this.state.errorPage) {
      return (

        <div className="modal-container">
          <div className="exit-location-container">
            <button className="exit-location-button" onClick={this.props.locationActive}>&times;</button>
          </div>
          <div className='location-component flex justify-content-center loading-map'>
            <div className="map-wrapper no-min-width home-page flex align-items-center location-error-padding">
              <p className="empty-page">Sorry, there was an error connecting to the network! Please check your internet connection and try again.</p>
            </div>
        </div>
      </div>

      );
    } else if (!this.state.lat || !this.state.lng) {
      return (
        <div className="modal-container">
          <div className="exit-location-container">
            <button className="exit-location-button" onClick={this.props.locationActive}>&times;</button>
          </div>
        <div className='home-page-container loading-map'>
          <div className="home-page no-min-width">
            <div className='home-margin'>
                <div className="loading-container loading-map-width">
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
          <div className="exit-location-container">
            <button className="exit-location-button" onClick={this.props.locationActive}>&times;</button>
          </div>
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
