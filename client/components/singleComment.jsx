import React from 'react';
import { format, parseISO } from 'date-fns';
import OutsideClickHandler from 'react-outside-click-handler';

export default class SingleComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      state: null
    };

  }

  render() {
    const singleComment = this.props.singleComment;
    const loggedInUserId = this.props.loggedInUserId;
    const createdAtFormatted = format(parseISO(singleComment.createdAt), 'LLL dd, yyyy');
    return (
      <div className="transparent-border-top">
        <div className="post-header no-border-bottom no-bottom-padding">
          <div className="flex profile-user-date">
            <div className="flex align-items">
              <i className="fas fa-user profile user"></i>
            </div>
            <div className="username-date flex column flex-start">
              <p className="post-creator-creation username roboto-font">{singleComment.username}</p>
              <p className="date post-creator-creation roboto-font">{createdAtFormatted}</p>
            </div>
          </div>
          <div>
            <OutsideClickHandler onOutsideClick={this.dropdownClose}>
              <div className={singleComment.userId === loggedInUserId ? '' : 'hidden'}>
                <svg onClick={this.dropdownOpen} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical options-button relative" viewBox="0 0 16 16">
                  <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                </svg>
              </div>
            </OutsideClickHandler>
          </div>
        </div>
        <div>
          <div className="post-body">
            <p className="post-text roboto-font">{singleComment.commentText}</p>
          </div>
        </div>
      </div>
    );
  }
}
