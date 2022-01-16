import React from 'react';
import { format, parseISO } from 'date-fns';

export default class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: this.props.post.post,
      price: this.props.post.price,
      startDate: format(parseISO(this.props.post.startDate), 'yyyy-MM-dd'),
      startTime: this.props.post.startTime,
      endTime: this.props.post.endTime,
      location: this.props.post.location
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.isButtonActive = this.isButtonActive.bind(this);
    this.editPost = this.editPost.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  isButtonActive() {
    const post = this.props.post;
    if (this.state.post === post.post && this.state.price === post.price && this.state.startDate === post.startDate && this.state.startTime === post.startTime && this.state.endTime === post.endTime && this.state.location === post.location) {
      return false;
    } else if (this.state.post !== '' && this.state.price !== '' && this.state.startDate !== '' && this.state.startTime !== '' && this.state.endTime !== '' && this.state.location !== '') {
      return true;
    } else {
      return false;
    }
  }

  handleReset() {
    const post = this.props.post;
    this.setState({
      post: post.post,
      price: post.price,
      startDate: post.startDate,
      startTime: post.startTime,
      endTime: post.endTime,
      location: post.location
    });
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  }

  editPost() {
    const post = this.props.post;
    this.setState({
      post: post.post,
      price: post.price,
      startDate: post.startDate,
      startTime: post.startTime,
      endTime: post.endTime,
      location: post.location
    });
  }

  handleUpdate(event) {
    const post = this.props.post;
    event.preventDefault();
    fetch(`/api/posts/${post.postId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(response => response.json())
      .then(data => {
        this.props.getPosts();
      });
  }

  render() {
    const isActive = this.isButtonActive();
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
                            <div className="label-margin time-margin flex">
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
                  <button onClick={() => {
                    this.props.editModal();
                    this.handleReset();
                  }}
                  type="button" className="cancel">Cancel</button>
                  <button onClick={this.props.editModal} onSubmit={this.handleUpdate} className={isActive ? 'post post-button-active' : 'no-post'}>Post</button>
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
