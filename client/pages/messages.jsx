import React from 'react';

export default class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      am: true
    };
  }

  render() {
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
}
