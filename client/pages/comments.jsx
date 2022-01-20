import React from 'react';
// import AOS from 'aos';
import Post from '../components/post';

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
  }

  render() {
    const postId = this.props.paramsPostId;
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
      return (
        <div className='home-page-container'>
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
          </div>
        </div>
      );
    }
  }
}
