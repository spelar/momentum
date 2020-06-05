import produce from 'immer'; 
import { createReducer } from 'typesafe-actions';
import { SearchResultAction } from './types';
import { RESPONSE_SEARCH_RESULT_MOVIE_LIST, EMPTY_MOVIE_LIST, RESPONSE_MORE_MOVIE_LIST, SET_SCROLL_STATE, SET_LOADING_STATE } from './actions';

export interface SearchResultState {
	isSearchResultPage: boolean;
  movieList: string[];
  startIndex: number;
  isLastMovie: boolean;
  isScroll: boolean;
	isLoading: boolean;
}

const initialState = {
  isSearchResultPage: false,
  movieList: [],
  startIndex: 1,
  isLastMovie: false,
  isScroll: false,
	isLoading: false
};

const searchResult = createReducer<SearchResultState, SearchResultAction>(initialState, {
  [RESPONSE_SEARCH_RESULT_MOVIE_LIST]: (state, action) => 
		produce(state, draft => {
			const movieList = action.payload.items;
			const totalMovie = action.payload.total;
			let isLastMovie = state.isLastMovie;
			if (movieList.length === totalMovie || movieList.length > totalMovie) {
				isLastMovie = true;
			} else {
				isLastMovie = false;
			}
			draft.isLoading = false;
			draft.movieList = movieList;
			draft.isLastMovie = isLastMovie
		}),
  [EMPTY_MOVIE_LIST]: (state, action) => 
		produce(state, draft => {
			draft.movieList = [];
			draft.isScroll = false;
		}),
  [RESPONSE_MORE_MOVIE_LIST]: (state, action) => 
		produce (state, draft => {
			let moreMovieList = action.payload.items;
			const startIndex = action.payload.start;
			const totalMovie = action.payload.total;
			let movieList = state.movieList;
			let isLastMovie = state.isLastMovie;
			moreMovieList = movieList.concat(moreMovieList);
			if (moreMovieList.length === totalMovie) {
				isLastMovie = true;
			} else {
				isLastMovie = false;
			}
			draft.movieList = moreMovieList;
			draft.startIndex = startIndex;
			draft.isLastMovie = isLastMovie;
		}),
  [SET_SCROLL_STATE]: (state, action) => 
		produce(state, draft => {
			let isScroll = state.isScroll;
			if (action.payload) {
				isScroll = true;
			} else {
				isScroll = false;
			}
			draft.isScroll = isScroll;
		}),
	[SET_LOADING_STATE]: (state, action) => 
		produce(state, draft => {
			let isLoading = state.isLoading;
			if (action.payload) {
				isLoading = true;
			} else {
				isLoading = false;
			}
			draft.isLoading = isLoading;
		})
});

export default searchResult;