import React from 'react';

export default class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setting: false
    };
    this.handleEditMode = this.handleEditMode.bind(this);
    this.handleDeleteMode = this.handleDeleteMode.bind(this);
  }

  handleEditMode() {
    if (typeof this.props.singleComment !== 'undefined') {
      this.props.commentBoxOpen();
    } else {
      this.props.editModal();
    }
  }

  handleDeleteMode() {
    if (typeof this.props.singleComment === 'undefined') {
      this.props.deleteModalOpen();
    } else {
      this.props.deleteCommentModalOpen();
    }
  }

  render() {
    return (
      <>
        <button onClick={this.handleEditMode} className="dropdown-option border-bottom dropdown-top">Edit</button>
        <button onClick={this.handleDeleteMode} className="delete-color dropdown-option dropdown-bottom">Delete</button>
      </>
    );
  }
}
