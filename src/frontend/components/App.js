import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Intro from "components/pages/Intro/Intro";


class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Intro} />
      </div>
    );
  }
}

export default App;
