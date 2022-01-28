import React from 'react';
import Home from './pages/home';
import Saved from './pages/saved';
import Comments from './pages/comments';
import Messages from './pages/messages';
import parseRoute from './lib/parse-route';
import Navigation from './components/navigation';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUserId: 2,
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    /**
     * Listen for hash change events on the window object
     * Each time the window.location.hash changes, parse
     * it with the parseRoute() function and update state
     */

    window.addEventListener('hashchange', event => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <>
        <Home loggedInUserId={this.state.loggedInUserId} />
      </>;
    } else if (route.path === 'saved') {
      return <>
        <Saved loggedInUserId={this.state.loggedInUserId} />
        </>;
    } else if (route.path === 'messages') {
      return <>
        <Messages loggedInUserId={this.state.loggedInUserId} />
      </>;
    } else if (route.path === 'comments') {
      const paramsPostId = route.params.get('postId');
      return <>
        <Comments routePath={route.path} paramsPostId={paramsPostId} loggedInUserId={this.state.loggedInUserId} />
      </>;
    }
    return <h1>Unknown Page</h1>;
  }

  render() {
    return (
      <>
        <Navigation routePath={this.state.route} />
    { this.renderPage() }
      </>
    );
  }
}
