import React, { Component } from 'react';
import './SearchList.scss';

export interface SearchListProps {
	search: {
		isSearch: boolean;
		autoCompleteKeywords: string[];
		searchKeyword: string;
		totalMovies: number;
		isAutoComplete: boolean;
	},
	searchResult: {
		isSearchResultPage: boolean;
		movieList: string[];
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

	const makeSearchList = () => {
		return searchResult.movieList.map((movie, i) => {
			const makeActorList = () => {
				let actor = movie.actor.replace(/\|/gi, ", ").slice(0,-2);
				return (
					<span dangerouslySetInnerHTML={{__html: actor}}/>
				)
			};
			return (
				<li key={'movie' + i} className="movie clearFix">
					<a target="_blank" href={movie.link} rel="noopener noreferrer">
						{movie.image !== "" ? <div className="image"><img src={movie.image} alt="영화 포스터" /></div> : <div className="image noimage"><span /></div>}
						<div className="info">
							<div className="clearFix">
								<h2 dangerouslySetInnerHTML={{__html: movie.title}} /><span className="pubDate"> (<span dangerouslySetInnerHTML={{__html: movie.pubDate}} />)</span>
							</div>
							<div className="userRating">
								<i className="momentum-icon momentum-icon-star" />
								<span className="score" dangerouslySetInnerHTML={{__html: movie.userRating}}/>
							</div>
							<div className="actor">
								{makeActorList()}
							</div>
						</div>
					</a>
				</li>
			)
		});
	};

	return (
		<div>
			{search.isAutoComplete !== true ?
			<div className={searchResult.isScroll ? "searchList listStyle" : "searchList"}>
				{searchResult.isLoading ? '' : <div className="title">검색 결과</div>}
				<ul>
					<div className={searchResult.isLoading ? "loader" : ''}></div>
					{searchResult.isLoading ? '' : (searchResult.movieList.length === 0 ? makeNoMovieList() : makeSearchList())}
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
