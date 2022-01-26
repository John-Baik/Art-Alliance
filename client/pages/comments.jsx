import React from 'react';
import AOS from 'aos';
import Post from '../components/post';
import SingleComment from '../components/singleComment';

export default class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: null,
      post: null,
      commentText: '',
      commentBoxOpen: false,
      postButtonActive: false

    };
    this.findComments = this.findComments.bind(this);
    this.findPost = this.findPost.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.commentBoxOpen = this.commentBoxOpen.bind(this);
    this.commentBoxClose = this.commentBoxClose.bind(this);
    this.addComment = this.addComment.bind(this);
    this.isButtonActive = this.isButtonActive.bind(this);
  }

  findComments() {
    const postId = this.props.paramsPostId;
    fetch(`/api/comments/${postId}`)
      .then(response => response.json())
      .then(data => {
        this.setState({ comments: data });
      });
  }

  findPost() {
    const postId = this.props.paramsPostId;
    fetch(`/api/posts/${postId}`)
      .then(response => response.json())
      .then(data => {
        this.setState({ post: data });
      });
  }

  addComment(event) {
    event.preventDefault();
    const userId = this.props.loggedInUserId;
    const postId = this.props.paramsPostId;
    const commentText = this.state.commentText;
    fetch(`/api/comments/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        postId: postId,
        commentText
      })
    })
      .then(response => response.json())
      .then(data => {
        this.findComments();
        this.commentBoxClose();
      });
  }

  commentBoxOpen(event) {
    event.preventDefault();
    this.setState({ commentBoxOpen: true });
  }

  commentBoxClose() {
    this.setState({
      commentBoxOpen: false,
      commentText: ''
    });
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState({ commentText: value });
  }

  isButtonActive() {
    if (this.state.commentText !== '') {
      return true;
    } else {
      return false;
    }
  }

  componentDidMount() {
    this.findComments();
    this.findPost();
    window.scrollTo(0, 0);
  }

  render() {
    const postId = this.props.paramsPostId;
    AOS.init({
      once: true
    });
    if (!this.state.comments || !this.state.post) {
      return (
        <div className='home-page-container'>
          <div className="home-page">
            <div className='home-margin'>
              <div className="loading-container ">
                <div className="loading-circle loader">
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (this.state.comments && this.state.post) {
      const numberOfComments = this.state.comments.length;
      const isActive = this.isButtonActive();
      const listComments = this.state.comments.map(singleComment => (
        <SingleComment loggedInUserId={this.props.loggedInUserId} key={singleComment.commentId} singleComment={singleComment} findComments={this.findComments} />
      ));
      return (
        <div className='home-page-container comments-padding-bottom'>
          <div className="home-page">
            <div className="add-post-container">
              <a href="#" data-aos="zoom-in" data-aos-once="true" id="home-option" className='roboto-font text-align-center'>Back</a>
            </div>
            <div className="flex justify-content-center">
              <div className="post-width">
                <ul className='home-posts'>
                  <Post routePath={this.props.routePath} loggedInUserId={this.props.loggedInUserId} key={postId} post={this.state.post} findPost={this.findPost} getPosts={this.getPosts} />
                </ul>
              </div>
            </div>
            <div className="flex justify-content-center">
              <div className="post-width">
                <div data-aos="fade-up" data-aos-offset="40" className="post-container">
                  <div className="post-second-container">
                    <div className="post-header no-border-bottom">
                      <div>
                        <p className="comment-header">{numberOfComments} Comments</p>
                      </div>
                    </div>
                  </div>
                  <form className="no-margin">
                  <div className="post-second-container">
                    <div className='post-header no-border-bottom no-padding-top'>
                      <button onClick={this.commentBoxOpen} className={this.state.commentBoxOpen ? 'hidden' : 'add-comment-button'}>Add a Public Comment...</button>
                      <textarea className={this.state.commentBoxOpen ? 'post-textbox input-box-border post-padding-top comment-textbox-width' : 'hidden'} onChange={this.handleChange} value={this.state.commentText} name="commentText" placeholder="Add a Public Comment..." id="post-title"
                      ref={inputElement => {
                        if (inputElement) {
                          inputElement.focus();
                        }
                      }}></textarea>
                    </div>
                      <div className={this.state.commentBoxOpen ? 'create-comment-buttons comment-button-margin-bottom padding-right-comment-buttons' : 'hidden'}>
                      <button onClick={this.commentBoxClose} type="button" className='cancel'>Cancel</button>
                      <button onClick={this.addComment} className={isActive ? 'post post-button-active' : 'no-post'}>Post</button>
                    </div>
                  </div>
                  </form>
                  <div className="post-second-container">
                    <ul className='home-posts'>
                    {listComments}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
