import React from 'react';
import SavedPost from '../components/savedPost';
import AOS from 'aos';

export default class Saved extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      savedPosts: null,
      errorPage: false
    };
    this.getSavedPosts = this.getSavedPosts.bind(this);
  }

  getSavedPosts() {
    fetch(`/api/saved/${this.props.loggedInUserId}`)
      .then(res => res.json())
      .then(
        savedPosts => {
          this.setState({ savedPosts });
        },
        error => {
          this.setState({ errorPage: true });
          console.error(error);
        }
      );
  }

  componentDidMount() {
    this.getSavedPosts();
    window.scrollTo(0, 0);
  }

  render() {
    AOS.init();
    if (this.state.errorPage) {
      return (
        <>
          <div className='home-page-container'>
            <div className="home-page home-page-padding-top">
              <div className="flex justify-content-center">
                <div className="post-width flex column align-items">
                  <p data-aos="fade-right" className='empty-page roboto-font text-align-center'>Sorry, there was an error connecting to the network! Please check your internet connection and try again.</p>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    } else if (!this.state.savedPosts) {
      return (
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
      );
    }
    const savedListItems = this.state.savedPosts.map(savedPost => (
      <SavedPost loggedInUserId={this.props.loggedInUserId} key={savedPost.postId} savedPost={savedPost} getSavedPosts={this.getSavedPosts} />
    ));
    return (
      <div className='home-page-container'>
        <div className="home-page home-page-padding-top">
          <div className="flex justify-content-center">
            <div className="post-width flex column align-items">
              <a href="#" data-aos="zoom-in" data-aos-once="true" id="home-option" className={savedListItems.length === 0 ? 'roboto-font text-align-center' : 'hidden'}>Home</a>
              <p data-aos="fade-right" className={savedListItems.length === 0 ? 'empty-page roboto-font text-align-center' : 'hidden'}>Saved Collection empty. Find posts to save!</p>
              <ul className='home-posts'>{savedListItems}</ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
