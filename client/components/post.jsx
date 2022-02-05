import React from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import Delete from '../components/delete';
import Edit from './edit';
import Dropdown from './dropdown';
import { format, parseISO, parse } from 'date-fns';
import AOS from 'aos';

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfComments: null,
      comments: null,
      dropdownButton: false,
      editModalOpen: false,
      deleteModalOpen: false,
      bookmarkActive: false
    };
    this.dropdownOpen = this.dropdownOpen.bind(this);
    this.editModal = this.editModal.bind(this);
    this.dropdownClose = this.dropdownClose.bind(this);
    this.deleteModalOpen = this.deleteModalOpen.bind(this);
    this.deleteModalClose = this.deleteModalClose.bind(this);
    this.addSaved = this.addSaved.bind(this);
    this.removeSaved = this.removeSaved.bind(this);
    this.handleBookmarks = this.handleBookmarks.bind(this);
    this.findComments = this.findComments.bind(this);
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

  dropdownClose() {
    this.setState({ dropdownButton: false });
  }

  dropdownOpen() {
    this.setState({ dropdownButton: !this.state.dropdownButton });
  }

  removeSaved(event) {
    const post = this.props.post;
    event.preventDefault();
    fetch(`/api/saved/${post.postId}`, {
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

  addSaved(event) {
    const post = this.props.post;
    event.preventDefault();
    fetch(`/api/saved/${this.props.loggedInUserId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ postId: post.postId })
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ bookmarkActive: !this.state.bookmarkActive });
      });
  }

  findComments() {
    const postId = this.props.post.postId;
    fetch(`/api/comments/${postId}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          comments: data
        });
        const numberOfComments = this.state.comments.length;
        this.setState({ numberOfComments: numberOfComments });
      });
  }

  handleBookmarks() {
    const post = this.props.post;
    const loggedInUserId = this.props.loggedInUserId;
    fetch(`/api/saved/${loggedInUserId}`)
      .then(res => res.json())
      .then(savedList => {
        for (let i = 0; i < savedList.length; i++) {
          if (savedList[i].postId === post.postId) {
            this.setState({ bookmarkActive: true });
          }
        }
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log(error.message);
      });
  }

  componentDidMount() {
    this.handleBookmarks();
    this.findComments();
  }

  render() {
    const routePath = this.props.routePath;
    const numberOfComments = this.state.numberOfComments;
    AOS.init({
      once: true
    });
    const post = this.props.post;
    if (!post.price) {
      post.price = '';
    }
    if (!post.startTime) {
      post.startTime = '';
    }
    if (!post.endTime) {
      post.endTime = '';
    }
    if (!post.startDate) {
      post.startDate = '';
    }
    if (!post.location) {
      post.location = '';
    }
    const loggedInUserId = this.props.loggedInUserId;
    const createdAtFormatted = format(parseISO(post.createdAt), 'LLL dd, yyyy');
    if (!this.numberOfComments) {
      return (
      <>
      <div className={this.state.deleteModalOpen ? '' : 'hidden'}>
        <Delete noInternetPopUpHome={this.props.noInternetPopUpHome} routePath={this.props.routePath} getPosts={this.props.getPosts} post={post} deleteModalClose={this.deleteModalClose} findPost={this.props.findPost} deletedCommentStatus={this.props.deletedCommentStatus}/>
      </div>
        <div data-aos="fade-up" data-aos-offset="40">
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
                    <OutsideClickHandler onOutsideClick={this.dropdownClose}>
                      <div className={post.userId === loggedInUserId ? '' : 'hidden'}>
                        <svg onClick={this.dropdownOpen} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical options-button relative" viewBox="0 0 16 16">
                          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                        </svg>
                        <div className={this.state.dropdownButton ? 'dropdown-content' : 'hidden'}>
                          <Dropdown editModal={this.editModal} deleteModalOpen={this.deleteModalOpen} />
                        </div>
                      </div>
                      <div className={post.userId === loggedInUserId ? 'hidden' : ''}>
                        <i onClick={this.state.bookmarkActive ? this.removeSaved : this.addSaved} className={this.state.bookmarkActive ? 'fas fa-bookmark navigation-symbol bookmark-active' : 'far fa-bookmark navigation-symbol bookmark-inactive'}></i>
                      </div>
                    </OutsideClickHandler>
                    <div className={this.state.editModalOpen ? '' : 'hidden'}>
                      <Edit noInternetPopUpHome={this.props.noInternetPopUpHome} noInternetPopUp={this.props.noInternetPopUp} routePath={this.props.routePath} findPost={this.props.findPost} closeEditModal={this.closeEditModal} editModal={this.editModal} post={post} getPosts={this.props.getPosts} />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="post-body">
                    <p className="post-text roboto-font">{post.post}</p>
                      <div className={!post.price && !post.startDate && !post.startTime && !post.endTime && !post.location ? 'hidden' : 'post-table'}>
                      <div className="table">
                        <div className="align-items-center flex column">
                            <table className='table-width roboto-font'>
                            <thead>
                              <tr className="table-row1">
                                <th scope="column" className={post.price ? 'table' : 'hidden'}>PRICE</th>
                                <td scope="column" className={post.price ? 'table' : 'hidden'}>${post.price}</td>
                              </tr>
                              <tr className="table-row1">
                                <th scope="column" className={post.startDate ? 'table' : 'hidden'}>DATE</th>
                                  <td scope="column" className={post.startDate ? 'table' : 'hidden'}>{post.startDate ? format(parseISO(post.startDate), 'LLL dd, yyyy') : ''}</td>
                              </tr>
                              <tr className="table-row1">
                                <th scope="column" className={post.startTime ? 'table' : 'hidden'}>TIME</th>
                                <td scope="column" className={post.startTime ? 'table' : 'hidden'}>{post.startTime ? format(parse(post.startTime, 'H:mm:ss', new Date()), 'h:mm a') : ''} - {post.endTime ? format(parse(post.endTime, 'H:mm:ss', new Date()), 'h:mm a') : ''}</td>
                              </tr>
                              <tr className="table-row1">
                                <th scope="column" className={post.location ? 'table' : 'hidden'}>LOCATION</th>
                                <td scope="column" className={post.location ? 'relative location-button table' : 'hidden'}>{post.location}</td>
                              </tr>
                            </thead>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div className="post-comments priority">
                      <div>
                        <a href={`#comments?postId=${post.postId}`} className={routePath === 'comments' ? 'hidden' : 'relative comment-button roboto-font'}>Comments ({numberOfComments})</a>
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
