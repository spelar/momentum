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
		movieList: Item[];
		startIndex: number;
		isLastMovie: boolean;
		isScroll: boolean;
		isLoading: boolean;
	},
	moreMovieClick:() => void;
}

const SearchList = ({search, searchResult, moreMovieClick}: SearchListProps) => {
	const makeNoMovieList = () => {
		return (
			<div>
				<p className="noMovieListMessage">
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
					{searchResult.isLoading ? '' : (searchResult.movieList.length === 0 ? makeNoMovieList() : searchResult.movieList.map((movie, i) => (<SearchListItem movie={movie} key={i} />)))}
				</ul>
				{searchResult.movieList.length > 0 && searchResult.isLastMovie === false ?
					<div className="moreMovie">
						{searchResult.isLoading ? '' : <button className="btn" onClick={moreMovieClick}>
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
