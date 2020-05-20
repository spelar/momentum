import {createAction, handleActions} from 'redux-actions';
import produce from 'immer'; 

export const GET_SEARCH_RESULT_MOVIE_LIST = 'GET_SEARCH_RESULT_MOVIE_LIST';
const RESPONSE_SEARCH_RESULT_MOVIE_LIST = 'RESPONSE_SEARCH_RESULT_MOVIE_LIST';
const EMPTY_MOVIE_LIST = 'EMPTY_MOVIE_LIST';
export const GET_MORE_MOVIE_LIST = 'GET_MORE_MOVIE_LIST';
const RESPONSE_MORE_MOVIE_LIST = 'RESPONSE_MORE_MOVIE_LIST';
const SET_SCROLL_STATE = 'SET_SCROLL_STATE';
const SET_LOADING_STATE = 'SET_LOADING_STATE';

export const getSearchResultMovieList = createAction(GET_SEARCH_RESULT_MOVIE_LIST);
export const responseSearchResultMovieList = createAction(RESPONSE_SEARCH_RESULT_MOVIE_LIST);
export const emptyMovieList = createAction(EMPTY_MOVIE_LIST);
export const getMoreMovieList = createAction(GET_MORE_MOVIE_LIST);
export const responseMoreMovieList = createAction(RESPONSE_MORE_MOVIE_LIST);
export const setScrollState = createAction(SET_SCROLL_STATE);
export const setLoadingState = createAction(SET_LOADING_STATE);

const initialState = {
  isSearchResultPage: false,
  movieList: [],
  startIndex: 1,
  isLastMovie: false,
  isScroll: false,
	isLoading: false
};

const searchResult = handleActions({
  [RESPONSE_SEARCH_RESULT_MOVIE_LIST]: (state, action) => {
		return produce(state, draft => {
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
		});
  },
  [EMPTY_MOVIE_LIST]: (state) => {
		return produce(state, draft => {
			draft.movieList = [];
			draft.isScroll = false;
		});
  },
  [RESPONSE_MORE_MOVIE_LIST]: (state, action) => {
		return produce (state, draft => {
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
		});
  },
  [SET_SCROLL_STATE]: (state, action) => {
		return produce(state, draft => {
			let isScroll = state.isScroll;
			if (action.payload) {
				isScroll = true;
			} else {
				isScroll = false;
			}
			draft.isScroll = isScroll;
		});
  },
	[SET_LOADING_STATE]: (state, action) => {
		return produce(state, draft => {
			let isLoading = state.isLoading;
			if (action.payload) {
				isLoading = true;
			} else {
				isLoading = false;
			}
			draft.isLoading = isLoading;
		})
	}
}, initialState);

export default searchResult;