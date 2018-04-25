import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from "react-router-dom";
import RandomImage from 'components/atoms/RandomImage/RandomImage';
import {getRandomImage} from 'store/modules/randomImages';
import {randomImageLength} from "../store/modules/randomImages";

class RandomImageContainer extends Component {

  componentDidMount() {
    this.props.getRandomImage();
  }

  render() {
    return (
      <RandomImage randomImage={this.props.randomImage}/>
    )
  }
}

export default connect(
  (state) => {
    return {
      randomImage: state.randomImages.randomImage
    };
  },
  (dispatch) => ({
    getRandomImage: () => {
      return dispatch(getRandomImage(Math.floor(Math.random() * randomImageLength)));
    }
  })
)(withRouter(RandomImageContainer));
