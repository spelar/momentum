import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import Header from 'components/atoms/Header/Header'
import {
  searchIconClick
} from 'store/modules/search';

class SearchContainer extends Component {
  render() {
    const search = this.props.search;
    return (
      <div>
        <Header
          search={search}
          searchIconClick={this.props.searchIconClick}
        />
      </div>
    )
  }
}

export default connect(
  (state) => {
    return {
      search: state.search
    };
  },
  (dispatch) => ({
    searchIconClick: () => dispatch(searchIconClick())
  })
)(withRouter(SearchContainer));
