import React from 'react';
import Create from './create';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
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
    fetch('/api/posts')
      .then(res => res.json())
      .then(posts => {
        this.setState({ posts });
      });
  }

  render() {
    const listItems = this.state.posts.reverse().map(post => (
      <li key={post.postId} className="post-entry">
        <div className="post-container">
          <div className="post-second-container">
            <div className="post-header">
              <div className="flex profile-user-date">
                <div className="flex align-items">
                  <i className="fas fa-user profile user"></i>
                </div>
                <div className="username-date flex column flex-start">
                  <p className="post-creator-creation username roboto-font">{post.username}</p>
                  <p className="date post-creator-creation roboto-font">{post.createdAt}</p>
                </div>
              </div>
              <div>
                <i className="far fa-star navigation-symbol low-opacity star"></i>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical options-button" viewBox="0 0 16 16">
                  <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                </svg>
              </div>
            </div>
            <div>
              <div className="post-body">
                <p className="post-text roboto-font">{post.post}</p>
                <div className="post-table">
                  <div className="table">
                    <div className="align-items-center flex column">
                      <table className="table-width">
                        <thead>
                          <tr className="table-row1 roboto-font">
                            <th scope="column" className="table-mobile-inactive">PRICE</th>
                            <th scope="column" className="table-mobile-inactive">DATE</th>
                            <th scope="column" className="table-mobile-inactive">TIME</th>
                            <th scope="column" className="table-mobile-inactive">LOCATION</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="table-row2 roboto-font">
                            <td className="table-mobile-inactive">${post.price}</td>
                            <td className="table-mobile-inactive">{post.startDate}</td>
                            <td className="table-mobile-inactive">{post.startTime} - {post.endTime}</td>
                            <td className="table-mobile-inactive">{post.location}</td>
                          </tr>
                        </tbody>
                      </table>
                      <table className="table-width roboto-font">
                        <thead>
                          <tr className="table-row1">
                            <th scope="column" className="table-mobile-active">PRICE</th>
                            <td scope="column" className="table-mobile-active">${post.price}</td>
                          </tr>
                          <tr className="table-row1">
                            <th scope="column" className="table-mobile-active">DATE</th>
                            <td scope="column" className="table-mobile-active">{post.startDate}</td>
                          </tr>
                          <tr className="table-row1">
                            <th scope="column" className="table-mobile-active">TIME</th>
                            <td scope="column" className="table-mobile-active">{post.startTime} - {post.endTime}</td>
                          </tr>
                          <tr className="table-row1">
                            <th scope="column" className="table-mobile-active">LOCATION</th>
                            <td scope="column" className="table-mobile-active">{post.location}</td>
                          </tr>
                        </thead>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="post-comments">
                  <a className="comment-button roboto-font">Comments(1)</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    ));

    return (
      <>
      <div className="home-container flex column">
        <div className="navigation-container flex align-item">
          <div className="flex align-items">
            <h1 className="logo-mobile">A</h1>
            <h1 className="logo-desktop">ArtAlliance</h1>
          </div>
          <div className="navigation-desktop flex roboto-font">
            <div className="symbol-container">
              <i className="fas fa-home navigation-symbol"></i>
              <p className="navigation-title">Home</p>
            </div>
            <div className="symbol-container">
              <i className="far fa-star navigation-symbol"></i>
              <p className="navigation-title">Favorites</p>
            </div>
            <div className="symbol-container">
              <i className="far fa-comment-alt navigation-symbol"></i>
              <p className="navigation-title">Messages</p>
            </div>
            <div className="profile-icon-container">
              <i className="fas fa-user profile"></i>
            </div>
          </div>
          <div className="symbol-container navigation-mobile">
            <i className="fas fa-home navigation-symbol"></i>
            <p className="navigation-title">Home</p>
          </div>
          <div className="symbol-container navigation-mobile">
            <i className="far fa-star navigation-symbol"></i>
            <p className="navigation-title">Favorites</p>
          </div>
          <div className="symbol-container navigation-mobile">
            <i className="far fa-comment-alt navigation-symbol"></i>
            <p className="navigation-title">Messages</p>
          </div>
          <div className="profile-icon-container navigation-mobile">
            <i className="fas fa-user profile"></i>
          </div>
        </div>
        <div className="home-page">
          <div className="home-margin">
            <div className="page-title">
              <button className="add-post-button invisible">+</button>
              <h1 className="page-header">Home</h1>
              <div className="add-post-container">
                <Create getPosts={this.getPosts} />
              </div>
            </div>
            <ul className="home-posts">{listItems}</ul>
          </div>
        </div>
      </div>
      </>
    );
  }
}
