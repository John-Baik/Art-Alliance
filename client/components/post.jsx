import React from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

import Edit from './edit';
import { format, parseISO, parse } from 'date-fns';

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownButton: false,
      editModalOpen: false
    };
    this.dropdownOpen = this.dropdownOpen.bind(this);
    this.editModal = this.editModal.bind(this);
    this.dropdownClose = this.dropdownClose.bind(this);
  }

  dropdownClose() {
    this.setState({ dropdownButton: false });
  }

  editModal() {
    this.setState({
      dropdownButton: false,
      editModalOpen: !this.state.editModalOpen
    });
  }

  closeEditModal() {
    this.setState({
      editModalOpen: false
    });
  }

  dropdownOpen() {
    this.setState({ dropdownButton: !this.state.dropdownButton });
  }

  render() {
    const post = this.props.post;
    const dateFormatted = format(parseISO(post.startDate), 'LLL dd, yyyy');
    const createdAtFormatted = format(parseISO(post.createdAt), 'LLL dd, yyyy');
    const startTimeFormatted = format(parse(post.startTime, 'H:mm:ss', new Date()), 'h:mm a');
    const endTimeFormatted = format(parse(post.endTime, 'H:mm:ss', new Date()), 'h:mm a');
    return (
    <>
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
                    <p className="post-creator-creation username roboto-font">{post.username}</p>
                      <p className="date post-creator-creation roboto-font">{createdAtFormatted}</p>
                  </div>
                </div>
                <div>
                  <i className="far fa-star navigation-symbol low-opacity star"></i>
                  <div>
                    <OutsideClickHandler onOutsideClick={this.dropdownClose}>
                    <svg onClick={this.dropdownOpen} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical options-button relative" viewBox="0 0 16 16">
                      <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                    </svg>
                    <div className={this.state.dropdownButton ? 'dropdown-content' : 'hidden'}>

                        <button onClick={this.editModal} className="dropdown-option border-bottom dropdown-top">Edit</button>
                        <button onClick={this.dropdownOpen} className="delete-color dropdown-option dropdown-bottom">Delete</button>

                      </div>
                      </OutsideClickHandler>
                    <div className={this.state.editModalOpen ? '' : 'hidden'}>
                      <Edit closeEditModal={this.closeEditModal} editModal={this.editModal} post={post} getPosts={this.props.getPosts} />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="post-body">
                  <p className="post-text roboto-font">{post.post}</p>
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
                              <td className="table-mobile-inactive">${post.price}</td>
                                <td className="table-mobile-inactive">{dateFormatted}</td>
                                <td className="table-mobile-inactive">{startTimeFormatted} - {endTimeFormatted}</td>
                                <td className="relative location-button table-mobile-inactive">{post.location}</td>
                            </tr>
                          </tbody>
                        </table>
                        <table className="table-width roboto-font">
                          <thead>
                            <tr className="table-row1">
                              <th scope="column" className="table-mobile-active">PRICE</th>
                              <td scope="column" className="table-mobile-active">${post.price}</td>
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
                              <td scope="column" className="relative location-button table-mobile-active">{post.location}</td>
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
