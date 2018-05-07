import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import Header from 'components/atoms/Header/Header'
import SearchList from 'components/atoms/SearchList/SearchList';
import {emptyAutoComplete, getMovieList, searchIconClick, searchResultEmptyAutoComplete} from "../store/modules/search";
import {getSearchResultMovieList, emptyMovieList, getMoreMovieList, setScrollState} from "../store/modules/searchResult";
import queryString from "query-string";

class SearchResultContainer extends Component {
  constructor(props) {
    super(props);
    this.searchInputKeyUp = this.searchInputKeyUp.bind(this);
    this.searchBtnClick = this.searchBtnClick.bind(this);
    this.logoClick = this.logoClick.bind(this);
    this.moreMovieClick = this.moreMovieClick.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  };

  handleScroll(e) {
    this.props.setScrollState(true);
  };

  componentDidMount() {
    const {history} = this.props;
    const params = history.location.search;
    const parsed = queryString.parse(params);
    window.addEventListener('scroll', this.handleScroll);
    let searchData = {
      searchKeyword: parsed.search
    };
    this.props.searchResultEmptyAutoComplete(searchData);
    this.props.getSearchResultMovieList(searchData);
  }

  searchInputKeyUp(e) {
    if (e.target.value.length > 0) {
      let searchData = {
        searchKeyword : e.target.value
      };
      this.props.getMovieList(searchData);
    } else if (e.target.value.length === 0) {
      setTimeout(() => {
        this.props.emptyAutoComplete();
        this.props.setScrollState(false);
      }, 1500);
    }
  }

  logoClick() {
    this.props.emptyMovieList();
    this.props.emptyAutoComplete();
  }

  searchBtnClick() {
    this.props.emptyMovieList();
    const {history, search} = this.props;
    if (search.searchKeyword === "") {
      alert("영화 제목을 입력해주세요.")
      const params = history.location.search;
      const parsed = queryString.parse(params);
      let searchData = {
        searchKeyword: parsed.search
      };
      this.props.getSearchResultMovieList(searchData);
    } else {
      history.push('/searchResult?search=' + encodeURIComponent(search.searchKeyword));
      const params = history.location.search;
      const parsed = queryString.parse(params);
      let searchData = {
        searchKeyword: parsed.search
      };
      let searchKeyword = {
        searchKeyword: search.searchKeyword
      }
      this.props.getSearchResultMovieList(searchData);
      this.props.searchResultEmptyAutoComplete(searchKeyword);
    }
  }

  moreMovieClick() {
    const {history} = this.props;
    const params = history.location.search;
    const parsed = queryString.parse(params);
    const searchResult = this.props.searchResult;
    let searchData = {
      searchKeyword : parsed.search,
      startIndex : searchResult.startIndex + 5
    };
    this.props.getMoreMovieList(searchData);
  }

  render() {
    const search = this.props.search;
    const searchResult = this.props.searchResult;
    const stylePosition = {position:'relative'};
    return (
      <div style={stylePosition}>
        <Header
          search={search}
          searchIconClick={this.props.searchIconClick}
          searchInputKeyUp={this.searchInputKeyUp}
          searchBtnClick={this.searchBtnClick}
          logoClick={this.logoClick}
          searchResult={searchResult}
        />
        <SearchList
          search={search}
          searchResult={searchResult}
          moreMovieClick={this.moreMovieClick}
        />
      </div>
    )
  }
}

export default connect(
  (state) => {
    return {
      search: state.search,
      searchResult: state.searchResult
    };
  },
  (dispatch) => ({
    searchIconClick: () => dispatch(searchIconClick()),
    getMovieList: (searchKeyword) => dispatch(getMovieList(searchKeyword)),
    emptyAutoComplete: () => dispatch(emptyAutoComplete()),
    getSearchResultMovieList: (searchData) => dispatch(getSearchResultMovieList(searchData)),
    emptyMovieList: () => dispatch(emptyMovieList()),
    getMoreMovieList: (searchData) => dispatch(getMoreMovieList(searchData)),
    searchResultEmptyAutoComplete: (searchKeyword) => dispatch(searchResultEmptyAutoComplete(searchKeyword)),
    setScrollState: (isScroll) => dispatch(setScrollState(isScroll))
  })
)(withRouter(SearchResultContainer));
