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
      userIdReady: false,
      errorPage: false
    };
    this.getPosts = this.getPosts.bind(this);
    this.noInternetPopUpHome = this.noInternetPopUpHome.bind(this);
  }

  noInternetPopUpHome() {
    this.setState({ errorPage: true });
  }

  getPosts() {
    fetch('/api/posts')
      .then(res => res.json())
      .then(posts => {
        this.setState({ posts });
      },
      error => {
        this.setState({ errorPage: true });
        console.error(error);
      });
  }

  componentDidMount() {
    this.getPosts();
  }

  render() {
    AOS.init();
    if (this.state.errorPage) {
      return (
        <div className='home-page-container'>
          <div className="home-page-padding-top">
            <div className="flex justify-content-center">
              <div className="post-width flex column align-items">
                <p data-aos="fade-right" className='empty-page roboto-font text-align-center'>Sorry, there was an error connecting to the network! Please check your internet connection and try again.</p>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (!this.state.posts) {
      return (
        <div className='home-page-container'>
          <div>
            <div className='home-margin'>
              <div className="loading-container ">
                <div className="loading-circle loader">
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      const listItems = this.state.posts.map(post => (
      <Post noInternetPopUpHome={this.noInternetPopUpHome} loggedInUserId={this.props.loggedInUserId} key={post.postId} post={post} getPosts={this.getPosts} />
      ));
      return (
      <div className='home-page-container'>
        <div>
          <div className="add-post-container">
            <Create loggedInUserId={this.state.loggedInUserId} getPosts={this.getPosts} />
          </div>
          <div className="flex justify-content-center">
            <div className="post-width">
              <p data-aos="fade-right" className={this.state.posts.length === 0 ? 'empty-page roboto-font text-align-center' : 'hidden'}>Home page is empty. Add a post!</p>
              <ul className='home-posts'>{listItems}</ul>
            </div>
          </div>
        </div>
      </div>
      );
    }
  }
}
