import React from 'react';
import SavedPost from '../components/savedPost';

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
    if (!this.state.savedPosts) {
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
    const savedListItems = this.state.savedPosts.map(savedPost => (
      <SavedPost loggedInUserId={this.props.loggedInUserId} key={savedPost.postId} savedPost={savedPost} getSavedPosts={this.getSavedPosts} />
    ));
    return (
      <>
        <div className='home-page-container'>
          <div className="home-page">
            <div className='home-margin'>
              <div className="page-title justify-content-center">
                <h1 className="page-header">Saved</h1>
              </div>
              <div className="post-width">
                <p className={savedListItems.length === 0 ? 'empty-page roboto-font text-align-center' : 'hidden'}>There are no saved posts</p>
                <ul className='home-posts'>{savedListItems}</ul>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
