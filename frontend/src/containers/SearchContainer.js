import React, { useCallback } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Header from 'components/atoms/Header/Header'
import {
	setSearchState,
  getMovieList,
  emptyAutoComplete
} from 'store/modules/search';
import {
	setLoadingState
} from 'store/modules/searchResult';

function SearchContainer() {
	const dispatch = useDispatch();
	const history = useHistory();
	const search = useSelector(state => state.search.toJS());
	const searchResult = useSelector(state => state.searchResult.toJS());

  const searchInputKeyUp = useCallback((e) => {
    if (e.target.value.length > 0) {
      let searchData = {
        searchKeyword : e.target.value
      };
			dispatch(setSearchState(true));
			dispatch(getMovieList(searchData));
    } else if (e.target.value === '') {
			dispatch(emptyAutoComplete());
    }
	},[dispatch]);

  const searchBtnClick = useCallback(() => {
    if (search.searchKeyword === "") {
      alert("영화 제목을 입력해주세요.")
    } else {
			dispatch(setLoadingState(true));
      history.push('/searchResult?search=' + encodeURIComponent(search.searchKeyword));
    }
	},[dispatch, history, search]);

    return (
      <div>
        <Header
          search={search}
          searchInputKeyUp={searchInputKeyUp}
          searchBtnClick={searchBtnClick}
          searchResult={searchResult}
        />
      </div>
    )
}

export default SearchContainer;