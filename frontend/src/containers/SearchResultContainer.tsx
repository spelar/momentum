import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import Header from '../components/Header/Header'
import SearchList from '../components/SearchList/SearchList';
import { getSearchResultItemList, getMoreMovieList, setScrollState, setLoadingState } from '../store/modules/searchResult';
import { RootState } from '../store/modules';
import { setSearchKeyword } from '../store/modules/search';

export interface SearchResultContainerProps {}

const SearchResultContainer = (props: SearchResultContainerProps) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const params = history.location.search;
	const parsed = queryString.parse(params);
	const search = useSelector((state: RootState) => state.search);
	const searchResult = useSelector((state: RootState) => state.searchResult);

	const handleScroll = useCallback(() => {
		dispatch(setScrollState(true));
	}, [dispatch]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
		dispatch(setLoadingState(true));
		if (search.searchKeyword === '') {
			let searchKeyword = JSON.stringify(parsed.search);
			let searchData = {
				searchKeyword: JSON.stringify(parsed.search),
				searchType: search.searchType
			}
			dispatch(getSearchResultItemList(searchData));
			dispatch(setSearchKeyword(searchKeyword));
		} else {
			let searchKeyword = JSON.stringify(search.searchKeyword);
			let searchData = {
				searchKeyword: JSON.stringify(parsed.search),
				searchType: search.searchType
			}
			dispatch(getSearchResultItemList(searchData));
			dispatch(setSearchKeyword(searchKeyword));
		}
  }, [dispatch, handleScroll, parsed.search, search.searchKeyword, search.searchType]);

  const moreItemClick = useCallback(() => {
    let searchData = {
      searchKeyword : JSON.stringify(parsed.search),
      startIndex : searchResult.startIndex + 5
    };
    dispatch(getMoreMovieList(searchData));
  }, [dispatch, parsed.search, searchResult.startIndex]);

	return (
		<div style={{position:'relative'}}>
			<Header />
			<SearchList
				search={search}
				searchResult={searchResult}
				moreItemClick={moreItemClick}
			/>
		</div>
	)
}

export default SearchResultContainer;