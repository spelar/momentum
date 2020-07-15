import React, { useEffect, useCallback, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import queryString from 'query-string';
import './Header.scss';
import AutoComplete from '../../components/AutoComplete/AutoComplete';
import { setSearchState, emptyAutoComplete, getMovieList, setSearchKeyword } from '../../store/modules/search';
import { getSearchResultMovieList, emptyMovieList, setScrollState, setLoadingState } from '../../store/modules/searchResult';
import { RootState } from '../../store/modules';

export interface HeaderProps {};

const Header = (props: HeaderProps) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const params = history.location.search;
	const parsed = queryString.parse(params);
	const search = useSelector((state:RootState) => state.search);
	const searchResult = useSelector((state:RootState) => state.searchResult);
	const [movieName, setMovieName] = useState('');
	useEffect(() => {
		if (history.location.pathname === '/searchResult') {
			setMovieName(String(parsed.search));
		}
	}, [history.location.pathname, parsed.search]);

	const logoClick = useCallback(() => {
    dispatch(emptyMovieList());
    dispatch(emptyAutoComplete());
  }, [dispatch]);

	const onChange = useCallback((e) => {
    setMovieName(e.target.value);
	}, []);

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

	const searchBtnClick = useCallback(() => {
    dispatch(emptyMovieList());
    if (search.searchKeyword === '') {
      alert('영화 제목을 입력해주세요.')
			dispatch(setLoadingState(true));
      let searchData = {
        searchKeyword: JSON.stringify(parsed.search) 
      };
      dispatch(getSearchResultMovieList(searchData));
    } else {
			dispatch(setLoadingState(true));
      history.push('/searchResult?search=' + encodeURIComponent(search.searchKeyword));
      let searchData = {
        searchKeyword: JSON.stringify(parsed.search)
      };
      let searchKeyword = {
        searchKeyword: JSON.stringify(search.searchKeyword)
      };
      dispatch(getSearchResultMovieList(searchData));
      dispatch(setSearchKeyword(searchKeyword));
    }
  }, [dispatch, history, parsed.search, search.searchKeyword]);

	return (
		<div>
			<div className={searchResult.isScroll === true && search.isAutoComplete === false ? 'header clearFix headerFixed' : 'header clearFix'}>
				<h1>
					<Link to='/search' className='logo' onClick={logoClick}>Momentum</Link>
				</h1>
				<div className='headerSearch'>
					<input className='input' onKeyUp={searchInputKeyUp} type='text' placeholder='영화를 검색해보세요.' title='검색어 입력' onChange={onChange} value={movieName} />
					<button className='btn btnSearch' onClick={searchBtnClick}><i className='momentum-icon momentum-icon-search'><span className='screenReaderOnly'>검색</span></i></button>
				</div>
			</div>
			<AutoComplete
				search={search}
				history={history}
			/>
		</div>
	);
}

export default Header;
