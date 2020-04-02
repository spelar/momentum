import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import RandomImageContainer from './containers/RandomImageContainer';
import SearchContainer from './containers/SearchContainer';
import SearchResultContainer from './containers/SearchResultContainer';


class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={RandomImageContainer} />
        <Route path="/search" component={SearchContainer} />
        <Route path="/searchResult" component={SearchResultContainer} />
      </div>
    );
  }
}

export default App;
