import React from 'react';
import SavedPost from '../components/savedPost';

export default class Saved extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      savedPosts: []
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
                  <ul className='home-posts'>{savedListItems}</ul>
                </div>
              </div>
            </div>
          </div>
      </>
    );
  }
}
