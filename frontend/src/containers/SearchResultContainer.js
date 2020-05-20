import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import Header from 'components/atoms/Header/Header'
import SearchList from 'components/atoms/SearchList/SearchList';
import { searchResultEmptyAutoComplete } from '../store/modules/search';
import { getSearchResultMovieList, getMoreMovieList, setScrollState, setLoadingState } from '../store/modules/searchResult';

function SearchResultContainer() {
	const dispatch = useDispatch();
	const history = useHistory();
	const params = history.location.search;
	const parsed = queryString.parse(params);
	const search = useSelector(state => state.search);
	const searchResult = useSelector(state => state.searchResult);

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
			<Header />
			<SearchList
				search={search}
				searchResult={searchResult}
				moreMovieClick={moreMovieClick}
			/>
		</div>
	)
}

export default SearchResultContainer;