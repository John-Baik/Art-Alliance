import React from 'react';

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
      postButtonActive: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.isButtonActive = this.isButtonActive.bind(this);
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
      isOpen: false
    });
  }

  isButtonActive() {
    if (this.state.post !== '' && this.state.price !== '' && this.state.startDate !== '' && this.state.startTime !== '' && this.state.endTime !== '' && this.state.location !== '') {
      return true;
    } else {
      return false;
    }
  }

  handleClick() {
    if (this.state.post !== '' && this.state.price !== '' && this.state.startDate !== '' && this.state.startTime !== '' && this.state.endTime !== '' && this.state.location !== '') {
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

  handleSubmit(event) {
    event.preventDefault();
    fetch('/api/posts', {
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
          isOpen: false
        });
      });
  }

  render() {
    const button = <button onClick={this.open} className="add-post-button">+</button>;
    const isActive = this.isButtonActive();

    if (this.state.isOpen) {
      return (
          <>
            {button}
            <div className={this.state.isOpen ? 'modal-container' : 'modal-container hidden'}>
              <div className="container" onClick={this.handleClick}>
                <div className="create-header">
                  <h1 className="header">Create Post</h1>
                </div>
                <div>
                  <div className="">
                    <form onReset={this.handleReset} onSubmit={this.handleSubmit}>
                      <div className="create-row1">
                        <div className="">
                          <div className="label-margin">
                            <label className="label-title no-margin" htmlFor="post-title">Post</label>
                          </div>
                        </div>
                        <textarea className="post-textbox input-box-border post-padding-top" value={this.state.post} onChange={this.handleChange} name="post" placeholder="Description" id="post-title" required></textarea>
                      </div>
                      <div className="">
                        <div className="">
                          <div className="">
                            <div className="price-date-time-container label-gap">
                              <div className="price-date-container flex price-date-gap">
                                <div className="">
                                  <div className="label-margin flex align-items">
                                    <label className="label-title" htmlFor="price-box">Price</label>
                                  </div>
                                  <div>
                                    <input value={this.state.price} onChange={this.handleChange} className="price-box input-box-border" placeholder="0.00" type="number" id="price-box" name="price" step="0.01" required></input>
                                  </div>
                                </div>
                                <div className="">
                                  <div className="label-margin flex align-items">
                                    <label className="label-title" htmlFor="date-box">Date</label>
                                  </div>
                                  <div>
                                    <input value={this.state.startDate} onChange={this.handleChange} className="date-box input-box-border" type="date" id="date-box" name="startDate" required></input>
                                  </div>
                                </div>
                              </div>
                              <div className="time-container flex">
                                <div className="">
                                  <div className="label-margin time-margin flex align-items">
                                    <label className="label-title" htmlFor="start-box">Time</label>
                                  </div>
                                  <div className="start-label-box">
                                    <label className="start-end-label" htmlFor="start-box">Start</label>
                                    <input value={this.state.startTime} onChange={this.handleChange} className="start-end-time-box input-box-border" type="time" id="start-box" name="startTime"
                                      required></input>
                                    <div>
                                    </div>
                                  </div>
                                </div>
                                <div className="placeholder">
                                  <div className="label-margin time-margin">
                                    <label className="label-title invisible">placeholder</label>
                                  </div>
                                  <div className="start-label-box flex">
                                    <label className="start-end-label" htmlFor="end-box">End</label>
                                    <input value={this.state.endTime} onChange={this.handleChange} className="start-end-time-box input-box-border" type="time" id="end-box" name="endTime"
                                      required></input>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="location-container">
                          <div className="label-margin flex align-items">
                            <label className="label-title" htmlFor="location-box">Location</label>
                          </div>
                          <div className="">
                            <input value={this.state.location} onChange={this.handleChange} className="location-box input-box-border" type="textbox" placeholder="Address" name="location" id="location-box" required></input>
                          </div>
                        </div>
                      </div>
                      <div className="create-buttons">
                        <button type="button" onClick={this.close} className="cancel">Cancel</button>
                        <button onSubmit={this.handleSubmit} className={isActive ? 'post post-button-active' : 'no-post'}>Post</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </>
      );
    } else {
      return button;
    }
  }
}