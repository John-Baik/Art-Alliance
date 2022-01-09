import React from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { format, parseISO, parse } from 'date-fns';

export default class savedPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteModalOpen: false,
      bookmarkActive: false
    };
    this.deleteModalOpen = this.deleteModalOpen.bind(this);
    this.deleteModalClose = this.deleteModalClose.bind(this);
    this.removeSaved = this.removeSaved.bind(this);
    this.handleBookmarks = this.handleBookmarks.bind(this);
  }

  deleteModalOpen() {
    this.setState({
      dropdownButton: false,
      deleteModalOpen: true
    });
  }

  deleteModalClose() {
    this.setState({
      deleteModalOpen: false
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

  handleBookmarks() {
    const savedPost = this.props.savedPost;
    const loggedInUserId = this.props.loggedInUserId;
    if (savedPost.userId !== loggedInUserId) {
      fetch('/api/saved')
        .then(res => res.json())
        .then(savedList => {
          for (let i = 0; i < savedList.length; i++) {
            if (savedList[i].postId === savedPost.postId && loggedInUserId !== savedList[i].userId) {
              this.setState({ bookmarkActive: true });
            }
          }
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.log(error.message);
        });
    }
  }

  render() {
    const savedPost = this.props.savedPost;
    const loggedInUserId = this.props.loggedInUserId;
    const dateFormatted = format(parseISO(savedPost.startDate), 'LLL dd, yyyy');
    const createdAtFormatted = format(parseISO(savedPost.createdAt), 'LLL dd, yyyy');
    const startTimeFormatted = format(parse(savedPost.startTime, 'H:mm:ss', new Date()), 'h:mm a');
    const endTimeFormatted = format(parse(savedPost.endTime, 'H:mm:ss', new Date()), 'h:mm a');

    if (savedPost.userId === loggedInUserId) {
      return (
        <>
          {/* <div className={this.state.deleteModalOpen ? '' : 'hidden'}>
            <Delete getPosts={this.props.getPosts} post={post} deleteModalClose={this.deleteModalClose} />
          </div> */}
          <div>
            <li className="post-entry">
              <div className="post-container">
                <div className="post-second-container">
                  <div className="post-header">
                    <div className="flex profile-user-date">
                      <div className="flex align-items">
                        <i className="fas fa-user profile user"></i>
                      </div>
                      <div className="username-date flex column flex-start">
                        <p className="post-creator-creation username roboto-font">{savedPost.username}</p>
                        <p className="date post-creator-creation roboto-font">{createdAtFormatted}</p>
                      </div>
                    </div>
                    <div>
                      <OutsideClickHandler onOutsideClick={this.dropdownClose}>
                        <i onClick={this.state.bookmarkActive ? this.removeSaved : this.addSaved} className='fas fa-bookmark navigation-symbol bookmark-active'></i>
                      </OutsideClickHandler>
                      <div className={this.state.editModalOpen ? '' : 'hidden'}>
                        {/* <Edit closeEditModal={this.closeEditModal} editModal={this.editModal} post={post} getPosts={this.props.getPosts} /> */}
                      </div>
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
}
