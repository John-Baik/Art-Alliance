import React from 'react';
import { format, parseISO } from 'date-fns';

export default class SingleComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      state: null
    };

  }

  render() {
    const singleComment = this.props.singleComment;

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
