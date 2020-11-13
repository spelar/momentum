import React from 'react';
import './SearchList.scss';
import SearchListItem from '../SearchListItem/SearchListItem';
import { Item } from '../../store/modules/searchResult';

export interface SearchListProps {
	search: {
		isSearch: boolean;
		autoCompleteKeywords: Item[];
		searchKeyword: string;
		total: number;
		isAutoComplete: boolean;
		searchType: string;
	},
	searchResult: {
		isSearchResultPage: boolean;
		searchList: Item[];
		startIndex: number; 
		isLastMovie: boolean;
		isScroll: boolean;
		isLoading: boolean;
	},
	moreItemClick:() => void;
}

const SearchList = ({search, searchResult, moreItemClick}: SearchListProps) => {
	const makeNoMovieList = () => {
		return (
			<div>
				<p className="nosearchListMessage">
					<strong>검색 결과가 없습니다.</strong>
				</p>
			</div>
		)
	};

	return (
		<div>
			{search.isAutoComplete !== true ?
			<div className={searchResult.isScroll ? "searchList listStyle" : "searchList"}>
				{searchResult.isLoading ? '' : <div className="title">검색 결과</div>}
				<ul>
					<div className={searchResult.isLoading ? "loader" : ''}></div>
					{searchResult.isLoading ? '' : (searchResult.searchList.length === 0 ? makeNoMovieList() : searchResult.searchList.map((item, i) => (<SearchListItem item={item} key={i} />)))}
				</ul>
				{searchResult.searchList.length > 0 && searchResult.isLastMovie === false ?
					<div className="moreItem">
						{searchResult.isLoading ? '' : <button className="btn" onClick={moreItemClick}>
						더보기 <i className="momentum-icon momentum-icon-long-arrow-right" />
						</button>}
					</div>
				: ""}
			</div>
				: ""}
		</div>
	);
}

export default SearchList;
