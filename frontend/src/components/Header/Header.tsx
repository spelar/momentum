import React, { useEffect, useCallback, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import queryString from 'query-string';
import './Header.scss';
import AutoComplete from '../../components/AutoComplete/AutoComplete';
import { setSearchState, emptyAutoComplete, getList, setSearchKeyword, setSearchType } from '../../store/modules/search';
import { getSearchResultItemList, emptyList, setScrollState, setLoadingState } from '../../store/modules/searchResult';
import { RootState } from '../../store/modules';

export interface HeaderProps {};

const Header = (props: HeaderProps) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const params = history.location.search;
	const parsed = queryString.parse(params);
	const search = useSelector((state:RootState) => state.search);
	const searchResult = useSelector((state:RootState) => state.searchResult);
	const [inputValue, setInputValue] = useState('');
	useEffect(() => {
		if (history.location.pathname === '/movie') {
			dispatch(setSearchType('movie'));
		} else if (history.location.pathname === '/book') {
			dispatch(setSearchType('book'));
		} else {
			setInputValue(String(parsed.q));
		}
	}, [history.location.pathname, parsed.search, dispatch]);

	const logoClick = useCallback(() => {
    dispatch(emptyList());
    dispatch(emptyAutoComplete());
  }, [dispatch]);

	const onChange = useCallback((e) => {
    setInputValue(e.target.value);
	}, []);

	const searchInputKeyUp = useCallback((e) => {
    if (e.target.value.length > 0) {
			let searchData = {
				searchKeyword: e.target.value,
				searchType: search.searchType
			}
			dispatch(setSearchState(true));
			dispatch(getList(searchData));
    } else if (e.target.value === '') {
			dispatch(emptyAutoComplete());
			dispatch(setScrollState(false));
    }
  }, [dispatch, search]);

	const searchBtnClick = useCallback(() => {
    dispatch(emptyList());
    if (search.searchKeyword === '') {
      alert('영화 제목을 입력해주세요.')
			dispatch(setLoadingState(true));
      let searchData = {
				searchKeyword: search.searchKeyword,
				searchType: search.searchType
			}
      dispatch(getSearchResultItemList(searchData));
    } else {
			dispatch(setLoadingState(true));
      history.push('/searchResult?searchType=' + search.searchType + '&q=' + encodeURIComponent(search.searchKeyword));
			let searchKeyword = JSON.stringify(search.searchKeyword);
			let searchData = {
				searchKeyword: search.searchKeyword,
				searchType: search.searchType
			}
      dispatch(getSearchResultItemList(searchData));
      dispatch(setSearchKeyword(searchKeyword));
    }
  }, [dispatch, history, search.searchKeyword, search.searchType]);

	const tabClick = useCallback((tabName) => {
		dispatch(emptyList());
    dispatch(emptyAutoComplete());
		if (tabName=== 'movie') {
			dispatch(setSearchType('movie'));
		} else {
			dispatch(setSearchType('book'));
		}
	}, [dispatch]);

	return (
		<div>
			<div className={searchResult.isScroll === true && search.isAutoComplete === false ? 'header clearFix headerFixed' : 'header clearFix'}>
				<h1>
					<Link to='/movie' className='logo' onClick={logoClick}>Momentum</Link>
				</h1>
				<div className='tab'>
					<div className='item'>
						<Link to='/movie' className={search.searchType === 'movie' ? 'on' : ''} onClick={() => tabClick('영화')}>영화</Link>
					</div>
					<div className='item'>
						<Link to='/book' className={search.searchType === 'book' ? 'on' : ''} onClick={() => tabClick('책')}>책</Link>
					</div>
				</div>
				<div className='headerSearch'>
					<input className='input' onKeyUp={searchInputKeyUp} type='text' placeholder={search.searchType === 'movie' ? '영화를 검색해 보세요' : '책을 검색해 보세요.'} title='검색어 입력' onChange={onChange} value={inputValue} />
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
