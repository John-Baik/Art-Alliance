import React from 'react';
import { format, parseISO } from 'date-fns';
import OutsideClickHandler from 'react-outside-click-handler';
import Dropdown from './dropdown';
import Delete from '../components/delete';

export default class SingleComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      state: null,
      dropdownButton: false,
      commentBoxOpen: false,
      commentText: this.props.singleComment.commentText,
      deleteCommentModalOpen: false
    };
    this.dropdownOpen = this.dropdownOpen.bind(this);
    this.dropdownClose = this.dropdownClose.bind(this);
    this.commentBoxOpen = this.commentBoxOpen.bind(this);
    this.deleteCommentModalOpen = this.deleteCommentModalOpen.bind(this);
    this.deleteCommentModalClose = this.deleteCommentModalClose.bind(this);
    this.commentBoxClose = this.commentBoxClose.bind(this);
    this.updateComment = this.updateComment.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.moveCaretAtEnd = this.moveCaretAtEnd.bind(this);
    this.handleDeleteComment = this.handleDeleteComment.bind(this);
  }

  commentBoxOpen(event) {
    this.setState({ commentBoxOpen: true });
  }

  commentBoxClose() {
    this.setState({
      commentBoxOpen: false,
      commentText: this.props.singleComment.commentText
    });
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  }

  updateComment(event) {
    event.preventDefault();
    const commentId = this.props.singleComment.commentId;
    const commentText = this.state.commentText;
    fetch(`/api/comments/${commentId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        commentText
      })
    })
      .then(response => response.json())
      .then(data => {
        this.props.findComments();
        this.commentBoxClose();
        this.setState({ commentText: data.commentText });
      },
      error => {
        console.error(error);
        this.props.noInternetPopUp();
      });
  }

  handleDeleteComment() {
    event.preventDefault();
    const commentId = this.props.singleComment.commentId;
    fetch(`/api/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        this.props.findComments();
        this.deleteCommentModalClose();
      },
      error => {
        console.error(error);
        this.props.noInternetPopUp();
      });
  }

  editModal() {
    this.setState({
      dropdownButton: false,
      editModalOpen: !this.state.editModalOpen
    });
  }

  isButtonActive() {
    const commentText = this.state.commentText;
    const originalCommentText = this.props.singleComment.commentText;
    if (commentText === originalCommentText) {
      return false;
    } else if (commentText !== '') {
      return true;
    } else {
      return false;
    }
  }

  dropdownOpen() {
    this.setState({ dropdownButton: !this.state.dropdownButton });
  }

  dropdownClose() {
    this.setState({ dropdownButton: false });
  }

  moveCaretAtEnd(e) {
    const tempValue = e.target.value;
    e.target.value = '';
    e.target.value = tempValue;
  }

  deleteCommentModalOpen() {
    this.setState({
      dropdownButton: false,
      deleteCommentModalOpen: true
    });
  }

  deleteCommentModalClose() {
    this.setState({
      deleteCommentModalOpen: false
    });
  }

  render() {
    const singleComment = this.props.singleComment;
    const isActive = this.isButtonActive();
    const loggedInUserId = this.props.loggedInUserId;
    const createdAtFormatted = format(parseISO(singleComment.createdAt), 'LLL dd, yyyy');
    return (
      <>
        <div className={this.state.deleteCommentModalOpen ? '' : 'hidden'}>
          <Delete routePath={this.props.routePath} handleDeleteComment={this.handleDeleteComment} singleComment={singleComment} deleteCommentModalClose={this.deleteCommentModalClose} findComments={this.props.findComments} />
        </div>
        <form className={this.state.commentBoxOpen ? 'no-margin' : 'hidden'}>
          <div className='edit-comment-textbox post-header no-border-bottom no-padding-top'>
            <textarea className={this.state.commentBoxOpen ? 'edit-comment-margin-top post-textbox input-box-border post-padding-top comment-textbox-width' : 'hidden'} onChange={this.handleChange} value={this.state.commentText} onFocus={this.moveCaretAtEnd} name="commentText" placeholder="Add a Public Comment..." id="post-title"
            ref={inputElement => {
              if (inputElement) {
                inputElement.focus();
              }
            }}></textarea>
          </div>
          <div className={this.state.commentBoxOpen ? 'create-comment-buttons comment-button-margin-bottom padding-right-comment-buttons' : 'hidden'}>
            <button onClick={this.commentBoxClose} type="button" className='cancel'>Cancel</button>
            <button onClick={this.updateComment} className={isActive ? 'post post-button-active' : 'no-post'}>Post</button>
          </div>
        </form>
        <div className={this.state.commentBoxOpen ? 'hidden' : 'transparent-border-top'}>
          <div className="comment-entry">
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
                  <div className={this.state.dropdownButton ? 'dropdown-content comment-dropdown' : 'hidden'}>
                    <Dropdown deleteCommentModalOpen={this.deleteCommentModalOpen} singleComment={this.props.singleComment} commentBoxOpen={this.commentBoxOpen} />
                  </div>
                </div>
              </OutsideClickHandler>
            </div>
          </div>
        </div>
        <div>
          <div className="post-body">
            <p className="post-text roboto-font">{singleComment.commentText}</p>
          </div>
        </div>
      </div>
    </>
    );
  }
}
