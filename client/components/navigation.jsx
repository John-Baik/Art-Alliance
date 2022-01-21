import React from 'react';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };

  }

  render() {
    const routePath = this.props.routePath.path;
    return (
      <>
        <div className="background">
        </div>
        <div className="home-container flex column">
          <div className="navigation-color">
            <div className="navigation-container flex align-item">
              <div className="flex align-items">
                <h1 className="logo-mobile priority">
                  <a href="" className="website-title relative">AA</a>
                </h1>
                <h1 className="logo-desktop priority">
                  <a href="" className="website-title relative">Art Alliance</a>
                </h1>
              </div>
              <div className="navigation-desktop flex roboto-font">
                <div>
                  <a href="#" className="symbol-container home-button relative">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={routePath === '' ? 'bi bi-house-door-fill home-button-click' : 'hidden'} viewBox="0 0 16 16">
                      <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={routePath === '' ? 'hidden' : 'bi bi-house-door'} viewBox="0 0 16 16">
                      <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z" />
                    </svg>
                    <p>Home</p>
                  </a>
                </div>
                <div className="symbol-container">
                  <a href="#saved" className="symbol-container relative">
                    <i className={routePath === 'saved' ? 'fas fa-bookmark navigation-symbol active' : 'far fa-bookmark navigation-symbol' }></i>
                    <p>Saved</p>
                  </a>
                </div>
                <div className="symbol-container">
                  <a href='#messages' className="symbol-container relative roboto-font">
                    <i className={routePath === 'messages' ? 'fas fa-comment-alt navigation-symbol' : 'far fa-comment-alt navigation-symbol'}></i>
                    <p>Messages</p>
                  </a>
                </div>
                <div className="profile-icon-container">
                  <i className="relative fas fa-user profile"></i>
                </div>
              </div>
              <div className="symbol-container navigation-mobile  roboto-font">
                <a href="#" className="symbol-container home-button relative ">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={routePath === '' ? 'bi bi-house-door-fill ' : 'hidden'} viewBox="0 0 16 16">
                    <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={routePath === '' ? 'hidden' : 'bi bi-house-door'} viewBox="0 0 16 16">
                    <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z" />
                  </svg>
                  <p>Home</p>
                </a>
              </div>
              <div className="symbol-container navigation-mobile  roboto-font">
                <a href="#saved" className="symbol-container relative">
                  <i className={routePath === 'saved' ? 'fas fa-bookmark navigation-symbol active' : 'far fa-bookmark navigation-symbol'}></i>
                  <p>Saved</p>
                </a>
              </div>
              <div className="symbol-container navigation-mobile roboto-font">
                <a href='#messages' className="symbol-container relative">
                  <i className={routePath === 'messages' ? 'fas fa-comment-alt navigation-symbol' : 'far fa-comment-alt navigation-symbol'}></i>
                  <p>Messages</p>
                </a>
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
