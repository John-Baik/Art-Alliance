import React from 'react';

export default class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: true
    };
  }

  render() {
    return (
       <>
        <div className='home-page-container'>
          <div className="home-page">
            <div>
              </div>
              <div className="post-width">
              </div>
            </div>
          </div>
      </>
    );
  }
}
