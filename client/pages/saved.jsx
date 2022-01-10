import React from 'react';
import SavedPost from '../components/savedPost';
import AOS from 'aos';

export default class Saved extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      savedPosts: null
    };
    this.getSavedPosts = this.getSavedPosts.bind(this);
  }

  getSavedPosts() {
    fetch(`/api/saved/${this.props.loggedInUserId}`)
      .then(res => res.json())
      .then(savedPosts => {
        this.setState({ savedPosts });
      });
  }

  componentDidMount() {
    this.getSavedPosts();
  }

  render() {
    AOS.init();
    if (!this.state.savedPosts) {
      return (
        <>
          <div className='home-page-container'>
            <div className="home-page">
              <div className='home-margin'>
                <div className="loading-container ">
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
    const savedListItems = this.state.savedPosts.map(savedPost => (
      <SavedPost loggedInUserId={this.props.loggedInUserId} key={savedPost.postId} savedPost={savedPost} getSavedPosts={this.getSavedPosts} />
    ));
    return (
      <>
        <div className='home-page-container'>
          <div className="home-page home-page-padding-top">
            <div className="flex justify-content-center">
              <div className="post-width">
                <p data-aos="fade-right" className={savedListItems.length === 0 ? 'empty-page roboto-font text-align-center' : 'hidden'}>You have no saved posts</p>
                <ul className='home-posts'>{savedListItems}</ul>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
