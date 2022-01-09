import React from 'react';
import Create from '../components/create';
import Post from '../components/post';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
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
                <ul className='home-posts'>{listItems}</ul>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
