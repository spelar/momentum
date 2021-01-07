import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import Header from '../components/Header/Header'
import SearchList from '../components/SearchList/SearchList';
import { getSearchResultItemList, getMoreMovieList, setScrollState, setLoadingState } from '../store/modules/searchResult';
import { RootState } from '../store/modules';
import { setSearchKeyword, setSearchType } from '../store/modules/search';
import { Helmet } from 'react-helmet';

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
			let searchKeyword = JSON.stringify(parsed.q);
			let searchData = {
				searchKeyword: String(parsed.q),
				searchType: String(parsed.searchType)
			}
			if (parsed.searchType === 'movie') {
				dispatch(setSearchType('movie'));
			} else {
				dispatch(setSearchType('book'));
			}
			dispatch(getSearchResultItemList(searchData));
			dispatch(setSearchKeyword(searchKeyword));
		} else {
			let searchKeyword = JSON.stringify(search.searchKeyword);
			let searchData = {
				searchKeyword: JSON.stringify(parsed.q),
				searchType: search.searchType
			}
			dispatch(getSearchResultItemList(searchData));
			dispatch(setSearchKeyword(searchKeyword));
		}
  }, [dispatch, handleScroll, parsed.q, parsed.searchType, search.searchType]);

  const moreItemClick = useCallback(() => {
    let searchData = {
      searchKeyword : JSON.stringify(parsed.q),
      startIndex : searchResult.startIndex + 5,
			searchType: search.searchType
    };
    dispatch(getMoreMovieList(searchData));
  }, [dispatch, parsed.q, searchResult.startIndex, search.searchType]);

	return (
		<div style={{position:'relative'}}>
			<Helmet>
				 <title>검색 결과</title>
			</Helmet>
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