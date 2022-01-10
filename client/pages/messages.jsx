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
}
