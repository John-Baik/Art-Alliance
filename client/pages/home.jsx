import React from 'react';
import Create from '../components/create';
import Post from '../components/post';
import AOS from 'aos';

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
    AOS.init();
    if (!this.state.posts) {
      return (
       <>
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
            <div className="add-post-container">
              <Create loggedInUserId={this.state.loggedInUserId} getPosts={this.getPosts} />
            </div>
            <div className="flex justify-content-center">
              <div className="post-width">
                <p data-aos="fade-right" className={this.state.posts.length === 0 ? 'empty-page roboto-font text-align-center' : 'hidden'}>There are no posts...</p>
                <ul className='home-posts'>{listItems}</ul>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
