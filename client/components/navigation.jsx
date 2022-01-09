import React from 'react';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  render() {
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
                  <a className="relative navigation-title">Saved</a>
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
                <a className="relative navigation-title">Saved</a>
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
        </div>
      </>
    );
  }
}
