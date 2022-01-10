import React from 'react';
import { format, parseISO, parse } from 'date-fns';
import AOS from 'aos';

export default class savedPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      savedPost: this.props.savedPost,
      bookmarkActive: true
    };
    this.removeSaved = this.removeSaved.bind(this);
    this.addSaved = this.addSaved.bind(this);
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

  render() {
    AOS.init();
    const savedPost = this.props.savedPost;
    const dateFormatted = format(parseISO(savedPost.startDate), 'LLL dd, yyyy');
    const createdAtFormatted = format(parseISO(savedPost.createdAt), 'LLL dd, yyyy');
    const startTimeFormatted = format(parse(savedPost.startTime, 'H:mm:ss', new Date()), 'h:mm a');
    const endTimeFormatted = format(parse(savedPost.endTime, 'H:mm:ss', new Date()), 'h:mm a');

    return (
        <>
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
                      <div className="post-table">
                        <div className="table">
                          <div className="align-items-center flex column">
                            <table className="table-width">
                              <thead>
                                <tr className="table-row1 roboto-font">
                                  <th scope="column" className="table-mobile-inactive">PRICE</th>
                                  <th scope="column" className="table-mobile-inactive">DATE</th>
                                  <th scope="column" className="table-mobile-inactive">TIME</th>
                                  <th scope="column" className="table-mobile-inactive">LOCATION</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="table-row2 roboto-font">
                                  <td className="table-mobile-inactive">${savedPost.price}</td>
                                  <td className="table-mobile-inactive">{dateFormatted}</td>
                                  <td className="table-mobile-inactive">{startTimeFormatted} - {endTimeFormatted}</td>
                                  <td className="relative location-button table-mobile-inactive">{savedPost.location}</td>
                                </tr>
                              </tbody>
                            </table>
                            <table className="table-width roboto-font">
                              <thead>
                                <tr className="table-row1">
                                  <th scope="column" className="table-mobile-active">PRICE</th>
                                  <td scope="column" className="table-mobile-active">${savedPost.price}</td>
                                </tr>
                                <tr className="table-row1">
                                  <th scope="column" className="table-mobile-active">DATE</th>
                                  <td scope="column" className="table-mobile-active">{dateFormatted}</td>
                                </tr>
                                <tr className="table-row1">
                                  <th scope="column" className="table-mobile-active">TIME</th>
                                  <td scope="column" className="table-mobile-active">{startTimeFormatted} - {endTimeFormatted}</td>
                                </tr>
                                <tr className="table-row1">
                                  <th scope="column" className="table-mobile-active">LOCATION</th>
                                  <td scope="column" className="relative location-button table-mobile-active">{savedPost.location}</td>
                                </tr>
                              </thead>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="post-comments priority">
                        <div>
                          <a href="" className="relative comment-button roboto-font">Comments(1)</a>
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