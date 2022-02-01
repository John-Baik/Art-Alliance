import React from 'react';

export default class Delete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalText: ''
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.modalText = this.modalText(this);
  }

  handleDelete(event) {
    const post = this.props.post;
    event.preventDefault();
    fetch(`/api/posts/${post.postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        if (this.props.routePath !== 'comments') {
          this.props.getPosts();
        } else {
          this.props.deletedCommentStatus();
        }
      },
      error => {
        console.error(error);
        this.props.noInternetPopUpHome();
      });
  }

  modalText() {
    if (typeof this.props.singleComment === 'undefined') {
      return 'post';
    } else {
      return 'comment';
    }
  }

  render() {
    return (
      <>
        <div className='modal-container'>
          <div className="container delete-modal flex justify-content-center align-items">
            <div className="flex column align-items delete-modal-gap">
              <div className="delete-modal-body">
                <h1 className="roboto-font text-align-center">Are you sure you want to delete your {this.modalText}?</h1>
              </div>
              <div className="flex delete-modal-buttons">
                <button onClick={typeof this.props.singleComment === 'undefined' ? this.props.deleteModalClose : this.props.deleteCommentModalClose} className="post cancel-button">Cancel</button>
                <button onClick={typeof this.props.singleComment === 'undefined' ? this.handleDelete : this.props.handleDeleteComment} className="post delete-button-active">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
