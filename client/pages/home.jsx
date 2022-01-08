import React from 'react';
import Create from '../components/create';
import Post from '../components/post';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      dummyUserId: '',
      userIdReady: false
    };
    this.getPosts = this.getPosts.bind(this);
    this.getUser = this.getUser.bind(this);
  }

  getPosts() {
    fetch('/api/posts')
      .then(res => res.json())
      .then(posts => {
        this.setState({ posts });
      });
  }

  getUser() {
    fetch('/api/users/2')
      .then(res => res.json())
      .then(user => {
        this.setState({ dummyUserId: user[0].userId });
        if (this.state.dummyUserId !== '') {
          this.setState({ userIdReady: true });
        } else {
          this.setState({ userIdReady: false });
        }
      });
  }

  componentDidMount() {
    this.getPosts();
    this.getUser();

  }

  render() {
    const listItems = this.state.posts.map(post => (
      <Post dummyUserId={this.state.dummyUserId} key={post.postId} post={post} getUser={this.getUser} getPosts={this.getPosts} />
    ));
    return (
      <>
        <div className="home-container flex column">
        <div className="navigation-color">
          <div className="navigation-container flex align-item">
            <div className="flex align-items">
              <h1 className="logo-mobile priority">
                <a className="relative">A</a>
              </h1>
              <h1 className="logo-desktop priority">
                <a className="relative">ArtAlliance</a>
              </h1>
            </div>
            <div className="navigation-desktop flex roboto-font">
              <div className="symbol-container">
                <i className="fas fa-home navigation-symbol"></i>
                <a className="relative navigation-title">Home</a>
              </div>
              <div className="symbol-container">
                <i className="far fa-bookmark navigation-symbol"></i>
                <a className="relative navigation-title">Favorites</a>
              </div>
              <div className="symbol-container">
                <i className="far fa-comment-alt navigation-symbol"></i>
                <a className="relative navigation-title">Messages</a>
              </div>
              <div className="profile-icon-container">
                  <i className="relative fas fa-user profile"></i>
              </div>
            </div>
            <div className="symbol-container navigation-mobile">
              <i className="fas fa-home navigation-symbol"></i>
              <a className="relative navigation-title">Home</a>
            </div>
            <div className="symbol-container navigation-mobile">
              <i className="far fa-star navigation-symbol"></i>
              <a className="relative navigation-title">Favorites</a>
            </div>
            <div className="symbol-container navigation-mobile">
              <i className="far fa-comment-alt navigation-symbol"></i>
              <a className="relative navigation-title">Messages</a>
            </div>
            <div className="profile-icon-container navigation-mobile">
              <i className="relative fas fa-user profile"></i>
            </div>
          </div>
        </div>
        <div className='home-page-container'>
          <div className="home-page">
              <div className={this.state.userIdReady ? 'home-margin' : 'hidden'}>
              <div className="page-title">
                <button className="add-post-button invisible">+</button>
                <h1 className="page-header">Home</h1>
                <div className="add-post-container">
                  <Create getPosts={this.getPosts} />
                </div>
              </div>
              <div className="post-width">
                <ul className='home-posts'>{listItems}</ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
    );

  }
}
