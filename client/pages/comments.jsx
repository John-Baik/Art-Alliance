import React from 'react';
import AOS from 'aos';
import Post from '../components/post';
import SingleComment from '../components/singleComment';

export default class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: null,
      post: null

    };
    this.findComments = this.findComments.bind(this);
    this.findPosts = this.findPost.bind(this);
  }

  findComments() {
    const postId = this.props.paramsPostId;
    event.preventDefault();
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
                  <Post routePath={this.props.routePath} loggedInUserId={this.props.loggedInUserId} key={postId} post={this.state.post} getPosts={this.getPosts} />
                </ul>
              </div>
            </div>
            <div className="flex justify-content-center">
              <div className="post-width">
                <div data-aos="fade-up" data-aos-offset="40" className="post-container">
                  <div className="post-second-container">
                    <div className="post-header no-border-bottom">
                      <div>
                        <p className="comment-header">Comments</p>
                      </div>
                    </div>
                  </div>
                  <div className="post-second-container">
                    <div className="post-header no-border-bottom comment-button-spacing">
                      <button className="add-comment-button">Add a Public Comment...</button>
                    </div>
                  </div>
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
