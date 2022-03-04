import React from 'react';
import { format, parseISO, parse } from 'date-fns';
import AOS from 'aos';
import Location from '../components/location';

export default class savedPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfComments: null,
      savedPost: this.props.savedPost,
      bookmarkActive: true,
      locationActive: false
    };
    this.removeSaved = this.removeSaved.bind(this);
    this.addSaved = this.addSaved.bind(this);
    this.findComments = this.findComments.bind(this);
    this.locationActive = this.locationActive.bind(this);
  }

  findComments() {
    const postId = this.props.savedPost.postId;
    fetch(`/api/comments/${postId}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          comments: data
        });
        const numberOfComments = this.state.comments.length;
        this.setState({ numberOfComments: numberOfComments });
      });
  }

  locationActive() {
    this.setState({ locationActive: !this.state.locationActive });
  }

  addSaved(event) {
    const savedPost = this.props.savedPost;
    event.preventDefault();
    fetch(`/api/saved/${this.props.loggedInUserId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ postId: savedPost.postId })
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ bookmarkActive: true });
      });
  }

  removeSaved(event) {
    const savedPost = this.props.savedPost;
    event.preventDefault();
    fetch(`/api/saved/${savedPost.postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ bookmarkActive: false });
      });
  }

  componentDidMount() {
    this.findComments();
  }

  render() {
    AOS.init();
    const routePath = this.props.routePath;
    const numberOfComments = this.state.numberOfComments;
    const savedPost = this.props.savedPost;
    const createdAtFormatted = format(parseISO(savedPost.createdAt), 'LLL dd, yyyy');
    return (
      <>
      { this.state.locationActive ? <Location postLocation={savedPost.location} locationActive={this.locationActive} className={this.state.locationActive ? '' : 'hidden'} /> : <></> }
      <div data-aos="fade-up" data-aos-offset="0">
        <li className="post-entry">
          <div className="post-container">
            <div className="post-second-container">
              <div className="post-header">
                <div className="flex profile-user-date">
                  <div className="flex align-items">
                    <i className="fas fa-user profile user"></i>
                  </div>
                  <div className="username-date flex column flex-start">
                    <p className="post-creator-creation username roboto-font">{savedPost.authorUsername}</p>
                    <p className="date post-creator-creation roboto-font">{createdAtFormatted}</p>
                  </div>
                </div>
                <div>
                  <i onClick={this.state.bookmarkActive ? this.removeSaved : this.addSaved} className={this.state.bookmarkActive ? 'fas fa-bookmark navigation-symbol bookmark-active' : 'far fa-bookmark navigation-symbol bookmark-inactive'}></i>
                </div>
              </div>
              <div>
                <div className="post-body">
                  <p className="post-text roboto-font">{savedPost.post}</p>
                  <div className={!savedPost.price && !savedPost.startDate && !savedPost.startTime && !savedPost.endTime && !savedPost.location ? 'hidden' : 'post-table'}>
                    <div className="table">
                      <div className="align-items-center flex column">
                        <table className="table-width roboto-font">
                          <thead>
                            <tr className="table-row1">
                              <th scope="column" className={savedPost.price ? 'table' : 'hidden'}>PRICE</th>
                              <td scope="column" className={savedPost.price ? 'table' : 'hidden'}>${savedPost.price}</td>
                            </tr>
                            <tr className="table-row1">
                              <th scope="column" className={savedPost.startDate ? 'table' : 'hidden'}>DATE</th>
                              <td scope="column" className={savedPost.startDate ? 'table' : 'hidden'}>{savedPost.startDate ? format(parseISO(savedPost.startDate), 'LLL dd, yyyy') : ''}</td>
                            </tr>
                            <tr className="table-row1">
                              <th scope="column" className={savedPost.startTime ? 'table' : 'hidden'}>TIME</th>
                              <td scope="column" className={savedPost.startTime ? 'table' : 'hidden'}>{savedPost.startTime ? format(parse(savedPost.startTime, 'H:mm:ss', new Date()), 'h:mm a') : ''} - {savedPost.endTime ? format(parse(savedPost.endTime, 'H:mm:ss', new Date()), 'h:mm a') : ''}</td>
                            </tr>
                            <tr className="table-row1">
                              <th scope="column" className={savedPost.location ? 'table' : 'hidden'}>LOCATION</th>
                              <td scope="column" className={savedPost.location ? 'relative table' : 'hidden'}>
                                <button className="location-button" onClick={this.locationActive}>{savedPost.location}</button>
                              </td>
                            </tr>
                          </thead>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="post-comments priority">
                    <div>
                    <a href={`#comments?postId=${savedPost.postId}`} className={routePath === 'comments' ? 'hidden' : 'relative comment-button roboto-font'}>Comments ({numberOfComments})</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </div>
      </>
    );
  }
}
