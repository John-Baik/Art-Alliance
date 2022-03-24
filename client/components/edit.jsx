import React from 'react';
import { format, parseISO } from 'date-fns';
import Geocode from 'react-geocode';

export default class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: this.props.post.post,
      price: this.props.post.price ? this.props.post.price : '',
      startDate: this.props.post.startDate,
      startTime: this.props.post.startTime ? this.props.post.startTime : '',
      endTime: this.props.post.endTime ? this.props.post.endTime : '',
      location: this.props.post.location ? this.props.post.location : '',
      priceInput: false,
      startDateInput: false,
      locationInput: false,
      startTimeInput: false,
      endTimeInput: false,
      invalidTime: false,
      invalidLocation: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.isButtonActive = this.isButtonActive.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.isInputActive = this.isInputActive.bind(this);
    this.invalidTime = this.invalidTime.bind(this);
    this.invalidLocation = this.invalidLocation.bind(this);
  }

  isButtonActive() {
    const post = this.props.post;
    const startDate = post.startDate;
    if (this.state.post === post.post && this.state.price === post.price && this.state.startDate === post.startDate && this.state.startTime === post.startTime && this.state.endTime === post.endTime && this.state.location === post.location) {
      return false;
    } else if ((this.state.post !== '' && this.state.post !== post.post) || (this.state.price !== post.price || this.state.startDate !== (startDate ? format(parseISO(startDate), 'yyyy-MM-dd') : '') || this.state.startTime !== post.startTime || this.state.endTime !== post.endTime || this.state.location !== post.location)) {
      return true;
    } else {
      return false;
    }
  }

  handleReset() {
    const post = this.props.post;
    this.setState({
      post: post.post,
      price: post.price ? post.price : '',
      startDate: post.startDate ? format(parseISO(post.startDate), 'yyyy-MM-dd') : '',
      startTime: post.startTime ? post.startTime : '',
      endTime: post.endTime ? post.endTime : '',
      location: post.location ? post.location : ''
    });
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  }

  isInputActive() {
    const name = event.target.name;
    if (name === 'price') {
      this.setState({ priceInput: !this.state.priceInput });
    } else if (name === 'startDate') {
      this.setState({ startDateInput: !this.state.startDateInput });
    } else if (name === 'location') {
      this.setState({ locationInput: !this.state.locationInput });
    } else if (name === 'startTime') {
      this.setState({ startTimeInput: !this.state.startTimeInput });
    } else if (name === 'endTime') {
      this.setState({ endTimeInput: !this.state.endTimeInput });
    }
  }

  invalidTime() {
    if ((this.state.startTime && this.state.endTime) || (!this.state.startTime && !this.state.endTime) || (this.state.startTime && !this.state.endTime)) {
      this.setState({ invalidTime: false });
    } else {
      this.setState({ invalidTime: true });
    }
  }

  invalidLocation() {
    this.setState({ invalidLocation: false });
  }

  testCoordinates() {
    const address = this.state.location;
    if (navigator.onLine) {
      if (address) {
        Geocode.setApiKey('AIzaSyBj9V_RJhLq9WQJOZccmLZKM-pymhhpnfE');
        Geocode.fromAddress(address).then(
          response => {
            if (!this.state.invalidTime) {
              this.props.editModal();
              this.handleUpdate();
            }
          },
          error => {
            console.error(error);
            this.setState({ invalidLocation: true });
          }
        );

      } else {
        this.props.getPosts();
      }
    }
  }

  handleUpdate(event) {
    const post = this.props.post;
    const routePath = this.props.routePath;
    this.invalidTime();
    this.invalidLocation();
    fetch(`/api/posts/${post.postId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(response => response.json())
      .then(() => {
        if (routePath === 'comments') {
          this.props.findPost();
        } else {
          this.props.getPosts();
        }
      },
      error => {
        console.error(error);
        if (routePath === 'comments') {
          this.props.noInternetPopUp();
        } else {
          this.props.noInternetPopUpHome();
        }
      });

  }

  render() {
    const isActive = this.isButtonActive();
    const startTime = <input value={this.state.startTime} onFocus={this.isInputActive} onBlur={this.isInputActive} onChange={this.handleChange} className="start-end-time-box input-box-border" type="time" id="start-box" name="startTime"></input>;
    const startTimeRequired = <input value={this.state.startTime} onFocus={this.isInputActive} onBlur={this.isInputActive} onChange={this.handleChange} className="start-end-time-box input-box-border" type="time" id="start-box" name="startTime" required></input>;
    const dt = new Date(this.state.startDate);
    const monthNumber = dt.getMonth();
    const date = dt.toUTCString();
    const dateArray = date.split(' ');
    const zeroPad = (num, places) => String(monthNumber + 1).padStart(places, '0');
    const startDateFinal = `${dateArray[3]}-${zeroPad(5, 2)}-${dateArray[1]}`;
    return (
    <>
    <div className='modal-container'>
      <div className="container">
        <div className="create-header">
          <h1 className="header">Edit Post</h1>
        </div>
        <div>
          <div className="">
              <form onSubmit={this.handleUpdate}>
              <div className="create-row1">
                <div className="">
                  <div className="label-margin">
                    <label className="label-title no-margin" htmlFor="post-title">Post</label>
                  </div>
                </div>
                <textarea className="post-textbox input-box-border post-padding-top" value={this.state.post} onChange={this.handleChange} name="post" placeholder="Description" id="post-title"></textarea>
              </div>
              <div className="">
                <div className="price-date-time-container label-gap">
                  <div className="price-date-container flex price-date-gap">
                    <div className={this.state.priceInput || this.state.price ? '' : 'light-opacity'}>
                      <div className="label-margin flex align-items">
                        <label className='label-title' htmlFor="price-box">Price</label>
                      </div>
                      <div>
                        <input value={this.state.price} onFocus={this.isInputActive} onBlur={this.isInputActive} onChange={this.handleChange} className="price-box input-box-border" placeholder="0.00" type="number" id="price-box" name="price" step="0.01"></input>
                      </div>
                    </div>
                    <div className={this.state.startDateInput || this.state.startDate ? '' : 'light-opacity'}>
                      <div className="label-margin flex align-items">
                        <label className='label-title' htmlFor="date-box">Date</label>
                      </div>
                      <div>
                        <input value={this.state.startDate ? startDateFinal : ''} onFocus={this.isInputActive} onBlur={this.isInputActive} onChange={this.handleChange} className="date-box input-box-border" type="date" id="date-box" name="startDate"></input>
                      </div>
                    </div>
                  </div>
                  <div className="time-container flex">
                    <div className="">
                      <div className="label-margin time-margin flex align-items">
                        <label className={this.state.startTimeInput || this.state.endTimeInput || this.state.startTime || this.state.endTime ? 'label-title' : 'light-opacity label-title'} htmlFor={!this.state.startTime ? 'start-box' : 'end-box'}>Time</label>
                        <div className="flex align-items-center">
                          <p className={this.state.invalidTime ? 'invalid start-time-missing' : 'hidden'}>Start Time Missing</p>
                        </div>
                      </div>
                      <div className={this.state.startTimeInput || this.state.startTime ? 'start-label-box' : 'light-opacity start-label-box'}>
                        <label className='start-end-label' htmlFor="start-box">Start</label>
                          {this.state.endTime ? startTimeRequired : startTime}
                      </div>
                    </div>
                    <div className={this.state.endTimeInput || this.state.endTime ? 'placeholder' : 'light-opacity placeholder'}>
                      <div className="label-margin time-margin flex">
                        <label className="label-title invisible">Time</label>
                      </div>
                      <div className="start-label-box flex">
                        <label className='start-end-label' htmlFor='end-box'>End</label>
                        <input value={this.state.endTime} onFocus={this.isInputActive} onBlur={this.isInputActive} onChange={this.handleChange} className="start-end-time-box input-box-border" type="time" id="end-box" name="endTime"></input>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={this.state.locationInput || this.state.location ? 'location-container' : 'light-opacity location-container'}>
                  <div className="label-margin flex align-items">
                    <label className='label-title' htmlFor="location-box">Location</label>
                    <p className={this.state.invalidLocation ? 'invalid' : 'hidden'}>Invalid Location</p>
                  </div>
                  <div className="">
                    <input value={this.state.location} onFocus={this.isInputActive} onBlur={this.isInputActive} onChange={this.handleChange} className="location-box input-box-border" type="textbox" placeholder="Address" name="location" id="location-box"></input>
                  </div>
                </div>
              </div>
              <div className="create-buttons">
                <button onClick={() => {
                  this.props.editModal();
                  this.handleReset();
                }}
                  type="button" className="cancel">Cancel</button>
                <button onClick={() => {
                  if (this.state.endTime && !this.state.startTime) {
                    this.invalidTime();
                    if (this.state.location) {
                      this.testCoordinates();
                    } else {
                      this.invalidLocation();
                    }
                  } else if (this.state.location) {
                    this.invalidTime();
                    this.testCoordinates();
                  } else {
                    this.handleUpdate();
                    this.props.editModal();
                  }
                }} type="button" className={isActive ? 'post post-button-active' : 'no-post'}>Post</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
    );
  }
}
