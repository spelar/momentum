import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Intro from "components/pages/Intro/Intro";
import Search from 'components/pages/Search/Search'


class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Intro} />
        <Route path="/search" component={Search} />
      </div>
    );
  }
}

export default App;
