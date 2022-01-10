import React from 'react';

export default class Delete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setting: false
    };
    this.handleDelete = this.handleDelete.bind(this);
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
        this.props.getPosts();
      });
  }

  render() {
    return (
      <>
        <div className='modal-container'>
          <div className="container delete-modal flex justify-content-center align-items">
            <div className="flex column align-items delete-modal-gap">
              <div className="delete-modal-body">
                <h1 className="roboto-font text-align-center">Are you sure you want to delete your post?</h1>
              </div>
              <div className="flex delete-modal-buttons">
                <button onClick={this.props.deleteModalClose} className="post cancel-button">Cancel</button>
                <button onClick={this.handleDelete} className="post delete-button-active">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
