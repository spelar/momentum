import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Intro from "components/pages/Intro/Intro";
import Search from 'components/pages/Search/Search';
import SearchResult from 'components/pages/SearchResult/SearchResult';


class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Intro} />
        <Route path="/search" component={Search} />
        <Route path="/searchResult" component={SearchResult} />
      </div>
    );
  }
}

export default App;
