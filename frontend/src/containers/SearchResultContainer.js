import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import queryString from "query-string";
import Header from 'components/atoms/Header/Header'
import SearchList from 'components/atoms/SearchList/SearchList';
import { setSearchState, emptyAutoComplete, getMovieList, searchIconClick, searchResultEmptyAutoComplete } from "../store/modules/search";
import { getSearchResultMovieList, emptyMovieList, getMoreMovieList, setScrollState, setLoadingState } from "../store/modules/searchResult";

function SearchResultContainer() {
	const dispatch = useDispatch();
	const history = useHistory();
	const params = history.location.search;
	const parsed = queryString.parse(params);
	const search = useSelector(state => state.search.toJS());
	const searchResult = useSelector(state => state.searchResult.toJS());

	const handleScroll = useCallback(() => {
		dispatch(setScrollState(true));
	}, [dispatch]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
		dispatch(setLoadingState(true));
		let searchData = {
      searchKeyword: parsed.search
    };
		dispatch(searchResultEmptyAutoComplete(searchData));
		dispatch(getSearchResultMovieList(searchData));
  }, [dispatch, handleScroll, parsed.search]);

  const searchInputKeyUp = useCallback((e) => {
    if (e.target.value.length > 0) {
      let searchData = {
        searchKeyword : e.target.value
      };
			dispatch(setSearchState(true));
      dispatch(getMovieList(searchData));
    } else if (e.target.value === '') {
			dispatch(emptyAutoComplete());
			dispatch(setScrollState(false));
    }
  }, [dispatch]);

  const logoClick = useCallback(() => {
    dispatch(emptyMovieList());
    dispatch(emptyAutoComplete());
  }, [dispatch]);

  const searchBtnClick = useCallback(() => {
    dispatch(emptyMovieList());
    if (search.searchKeyword === "") {
      alert("영화 제목을 입력해주세요.")
			dispatch(setLoadingState(true));
      let searchData = {
        searchKeyword: parsed.search
      };
      dispatch(getSearchResultMovieList(searchData));
    } else {
			dispatch(setLoadingState(true));
      history.push('/searchResult?search=' + encodeURIComponent(search.searchKeyword));
      let searchData = {
        searchKeyword: parsed.search
      };
      let searchKeyword = {
        searchKeyword: search.searchKeyword
      };
      dispatch(getSearchResultMovieList(searchData));
      dispatch(searchResultEmptyAutoComplete(searchKeyword));
    }
  }, [dispatch, history, parsed.search, search.searchKeyword]);

  const moreMovieClick = useCallback(() => {
    let searchData = {
      searchKeyword : parsed.search,
      startIndex : searchResult.startIndex + 5
    };
    dispatch(getMoreMovieList(searchData));
  }, [dispatch, parsed.search, searchResult.startIndex]);

    const stylePosition = {position:'relative'};
    return (
      <div style={stylePosition}>
        <Header
          search={search}
          searchIconClick={searchIconClick}
          searchInputKeyUp={searchInputKeyUp}
          searchBtnClick={searchBtnClick}
          logoClick={logoClick}
          searchResult={searchResult}
        />
        <SearchList
          search={search}
          searchResult={searchResult}
          moreMovieClick={moreMovieClick}
        />
      </div>
    )
}

export default SearchResultContainer;