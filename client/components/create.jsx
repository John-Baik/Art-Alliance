import React from 'react';
import AOS from 'aos';
import Geocode from 'react-geocode';

export default class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: '',
      price: '',
      startDate: '',
      startTime: '',
      endTime: '',
      location: '',
      isOpen: false,
      postButtonActive: false,
      errorPage: false,
      priceInput: false,
      startDateInput: false,
      locationInput: false,
      startTimeInput: false,
      endTimeInput: false,
      invalidLocation: false,
      invalidTime: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.isButtonActive = this.isButtonActive.bind(this);
    this.isInputActive = this.isInputActive.bind(this);
    this.testCoordinates = this.testCoordinates.bind(this);
    this.invalidTime = this.invalidTime.bind(this);
    this.invalidLocation = this.invalidLocation.bind(this);
  }

  open() {
    this.setState({ isOpen: true });
  }

  close() {
    this.setState({
      post: '',
      price: '',
      startDate: '',
      startTime: '',
      endTime: '',
      location: '',
      isOpen: false,
      invalidLocation: false,
      invalidTime: false
    });
  }

  isButtonActive() {
    if (this.state.post !== '') {
      return true;
    } else {
      return false;
    }
  }

  handleClick() {
    if (this.state.post !== '') {
      this.setState({ postButtonActive: true });
    } else {
      this.setState({ postButtonActive: false });
    }
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  }

  handleReset() {
    this.setState({
      post: '',
      price: '',
      startDate: '',
      startTime: '',
      endTime: '',
      location: ''
    });
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

  testCoordinates() {
    const address = this.state.location;
    this.invalidTime();
    if (navigator.onLine) {
      Geocode.setApiKey('AIzaSyBj9V_RJhLq9WQJOZccmLZKM-pymhhpnfE');
      Geocode.fromAddress(address).then(
        response => {
          if (!this.state.invalidTime) {
            this.handleSubmit();
          }
          this.setState({ invalidLocation: false });
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

  handleSubmit(event) {
    this.invalidTime();
    fetch(`/api/posts/${this.props.loggedInUserId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(response => response.json())
      .then(() => {
        this.props.getPosts();
        this.setState({
          post: '',
          price: '',
          startDate: '',
          startTime: '',
          endTime: '',
          location: '',
          isOpen: false,
          invalidLocation: false,
          invalidTime: false
        });
      },
      error => {
        this.setState({
          post: '',
          price: '',
          startDate: '',
          startTime: '',
          endTime: '',
          location: '',
          isOpen: false,
          errorPage: true
        });
        console.error(error);
      });

  }

  render() {
    const button = <button onClick={this.open} className="add-post-button">+</button>;
    const buttonTwo = <button className="add-post-button-modal">+</button>;
    const isActive = this.isButtonActive();
    AOS.init();
    if (this.state.errorPage) {
      this.props.getPosts();
      return (
        <>
        </>
      );
    } else if (this.state.isOpen) {
      const startTime = <input value={this.state.startTime} onFocus={this.isInputActive} onBlur={this.isInputActive} onChange={this.handleChange} className="start-end-time-box input-box-border" type="time" id="start-box" name="startTime"></input>;
      const startTimeRequired = <input value={this.state.startTime} onFocus={this.isInputActive} onBlur={this.isInputActive} onChange={this.handleChange} className="start-end-time-box input-box-border" type="time" id="start-box" name="startTime" required></input>;
      return (
          <>
            {buttonTwo}
            <div className={this.state.isOpen ? 'modal-container' : 'modal-container hidden'}>
              <div data-aos="zoom-in" className="container" onClick={this.handleClick}>
                <div className="create-header">
                  <h1 className="header">Create Post</h1>
                </div>
                <div>
                  <div className="">
                  <form onReset={this.handleReset} onSubmit={this.handleSubmit} autoComplete="off">
                      <div className="create-row1">
                        <div className="">
                          <div className="label-margin flex">
                            <label className="label-title no-margin" htmlFor="post-title">Post</label>
                          </div>
                        </div>
                        <textarea className="post-textbox input-box-border post-padding-top" value={this.state.post} onChange={this.handleChange} name="post" placeholder="Description" id="post-title" required></textarea>
                      </div>
                      <div>
                        <div className="price-date-time-container label-gap">
                          <div className="price-date-container flex price-date-gap">
                            <div className={this.state.priceInput || this.state.price ? '' : 'light-opacity'}>
                              <div className="label-margin flex align-items">
                                <label className='label-title' htmlFor="price-box">Price</label>
                              </div>
                              <div className="flex">
                                <input value={this.state.price} onFocus={this.isInputActive} onBlur={this.isInputActive} onChange={this.handleChange} className="price-box input-box-border" placeholder="0.00" type="number" id="price-box" name="price" step="0.01"></input>
                              </div>
                            </div>
                            <div className={this.state.startDateInput || this.state.startDate ? '' : 'light-opacity'}>
                              <div className="label-margin flex align-items">
                                <label className='label-title' htmlFor="date-box">Date</label>
                              </div>
                              <div className="flex">
                                <input value={this.state.startDate} onFocus={this.isInputActive} onBlur={this.isInputActive} onChange={this.handleChange} className="date-box input-box-border" type="date" id="date-box" name="startDate"></input>
                              </div>
                            </div>
                          </div>
                          <div className="time-container flex">
                            <div className=''>
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
                                <label className="label-title invisible">Test</label>
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
                          <div className="flex">
                            <input value={this.state.location} onFocus={this.isInputActive} onBlur={this.isInputActive} onChange={this.handleChange} className="location-box input-box-border" type="textbox" placeholder="Address" name="location" id="location-box"></input>
                          </div>
                        </div>
                      </div>
                      <div className="create-buttons">
                        <button type="button" onClick={this.close} className="cancel">Cancel</button>
                        <button onClick={() => {
                          if (this.state.endTime && !this.state.startTime) {
                            this.invalidTime();
                            if (this.state.location) {
                              this.testCoordinates();
                            } else {
                              this.invalidLocation();
                            }
                          } else if (this.state.location) {
                            this.testCoordinates();
                          } else {
                            this.handleSubmit();
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
    } else {
      return (
        <div data-aos="zoom-in" data-aos-once="true">
          {button}
        </div>
      );
    }
  }
}
