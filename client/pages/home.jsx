import React from 'react';
import Create from '../components/create';
import Post from '../components/post';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: null,
      loggedInUserId: this.props.loggedInUserId,
      userIdReady: false
    };
    this.getPosts = this.getPosts.bind(this);
  }

  getPosts() {
    fetch('/api/posts')
      .then(res => res.json())
      .then(posts => {
        this.setState({ posts });
      });
  }

  componentDidMount() {
    this.getPosts();
  }

  render() {
    if (!this.state.posts) {
      return (
       <>
          <div className='home-page-container'>
            <div className="home-page">
              <div className='home-margin'>
                <div className="full-width-height page-title flex justify-content-center align-items">
                  <div className="loading-circle loader"></div>
                </div>
                <div className="post-width">
                </div>
              </div>
            </div>
          </div>
       </>
      );
    }
    const listItems = this.state.posts.map(post => (
        <Post loggedInUserId={this.props.loggedInUserId} key={post.postId} post={post} getPosts={this.getPosts} />
    ));
    return (
      <>
        <div className='home-page-container'>
          <div className="home-page">
            <div className='home-margin'>
              <div className="page-title">
                <button className="add-post-button invisible">+</button>
                <h1 className="page-header">Home</h1>
                <div className="add-post-container">
                  <Create loggedInUserId={this.state.loggedInUserId} getPosts={this.getPosts} />
                </div>
              </div>
              <div className="post-width">
                <p className={this.state.posts.length === 0 ? 'empty-page roboto-font text-align-center' : 'hidden'}>There are no saved posts</p>
                <ul className='home-posts'>{listItems}</ul>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
