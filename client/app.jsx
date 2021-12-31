import React from 'react';
// import Home from './pages/home';
import Create from './pages/create';
import parseRoute from './lib/parse-route';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      return <Create />;
    }
    return <h1>Unknown Page</h1>;
  }

  render() {
    return (
      <>
    { this.renderPage() };
      </>
    );
  }
}
