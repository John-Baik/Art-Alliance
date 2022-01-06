import React from 'react';

export default class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setting: false
    };
  }

  render() {
    return (
      <>
        <button onClick={this.props.editModal} className="dropdown-option border-bottom dropdown-top">Edit</button>
        <button onClick={this.props.deleteModalOpen} className="delete-color dropdown-option dropdown-bottom">Delete</button>
      </>
    );
  }
}
