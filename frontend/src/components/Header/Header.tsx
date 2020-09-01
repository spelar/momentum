import React, { useEffect, useCallback, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import queryString from 'query-string';
import './Header.scss';
import AutoComplete from '../../components/AutoComplete/AutoComplete';
import { setSearchState, emptyAutoComplete, getList, setSearchKeyword, getBookList, setSearchType } from '../../store/modules/search';
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
		if (history.location.pathname === '/movie') {
			dispatch(setSearchType('movie'));
		} else {
			dispatch(setSearchType('book'));
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
      let searchKeyword = e.target.value;
			dispatch(setSearchState(true));
			if (search.searchType === 'movie') {
				dispatch(getList({searchKeyword}));
			} else {
				dispatch(getBookList({searchKeyword}));
			}
    } else if (e.target.value === '') {
			dispatch(emptyAutoComplete());
			dispatch(setScrollState(false));
    }
  }, [dispatch, search.searchType]);

	const searchBtnClick = useCallback(() => {
    dispatch(emptyMovieList());
    if (search.searchKeyword === '') {
      alert('영화 제목을 입력해주세요.')
			dispatch(setLoadingState(true));
      let searchKeyword = JSON.stringify(search.searchKeyword); 
      dispatch(getSearchResultMovieList({searchKeyword}));
    } else {
			dispatch(setLoadingState(true));
      history.push('/searchResult?search=' + encodeURIComponent(search.searchKeyword));
			let searchKeyword = JSON.stringify(search.searchKeyword);
      dispatch(getSearchResultMovieList({searchKeyword}));
      dispatch(setSearchKeyword(searchKeyword));
    }
  }, [dispatch, history, search.searchKeyword]);

	const tabClick = useCallback(() => {
		dispatch(emptyMovieList());
    dispatch(emptyAutoComplete());
	}, [dispatch]);

	return (
		<div>
			<div className={searchResult.isScroll === true && search.isAutoComplete === false ? 'header clearFix headerFixed' : 'header clearFix'}>
				<h1>
					<Link to='/movie' className='logo' onClick={logoClick}>Momentum</Link>
				</h1>
				<div className='tab'>
					<div className='item'>
						<Link to='/movie' className={search.searchType === 'movie' ? 'on' : ''} onClick={tabClick}>영화</Link>
					</div>
					<div className='item'>
						<Link to='/book' className={search.searchType === 'book' ? 'on' : ''} onClick={tabClick}>책</Link>
					</div>
				</div>
				<div className='headerSearch'>
					<input className='input' onKeyUp={searchInputKeyUp} type='text' placeholder={search.searchType === 'movie' ? '영화를 검색해 보세요' : '책을 검색해 보세요.'} title='검색어 입력' onChange={onChange} value={movieName} />
					<button className='btn btnSearch' onClick={searchBtnClick}><i className='momentum-icon momentum-icon-search'><span className='screenReaderOnly'>검색</span></i></button>
				</div>
			</div>
			<AutoComplete
				searchType={search.searchType}
				search={search}
				history={history}
			/>
		</div>
	);
}

export default Header;
