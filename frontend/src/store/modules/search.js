import {createAction, handleActions} from 'redux-actions';
import produce from 'immer'; 

const SET_SEARCH_STATE = 'search/SET_SEARCH_STATE';
const SEARCH_ICON_CLICK = 'search/SEARCH_ICON_CLICK';
export const GET_MOVIE_LIST = 'search/GET_MOVIE_LIST';
const RESPONSE_MOVIE_LIST = 'search/RESPONSE_MOVIE_LIST';
const EMPTY_AUTO_COMPLETE = 'search/EMPTY_AUTO_COMPLETE';
const SEARCH_RESULT_EMPTY_AUTO_COMPLETE = 'search/SEARCH_RESULT_EMPTY_AUTO_COMPLETE';

export const setSearchState = createAction(SET_SEARCH_STATE);
export const searchIconClick = createAction(SEARCH_ICON_CLICK);
export const getMovieList= createAction(GET_MOVIE_LIST);
export const responseMovieList = createAction(RESPONSE_MOVIE_LIST);
export const emptyAutoComplete = createAction(EMPTY_AUTO_COMPLETE);
export const searchResultEmptyAutoComplete = createAction(SEARCH_RESULT_EMPTY_AUTO_COMPLETE);

const initialState = {
	isSearch: false,
  autoCompleteKeywords: [],
  searchKeyword: '',
  totalMovies: 0,
  isAutoComplete: false,
};

const search = handleActions({
	[SET_SEARCH_STATE]: (state, action) => {
		return produce(state, draft => {
			if (action.payload) {
				draft.isSearch = true;
			} else {
				draft.isSearch = false;
			}
		});
	},
  [RESPONSE_MOVIE_LIST]: (state, action) => {
		return produce(state, draft => {
			const { items, total, searchKeyword} = action.payload;
			if (state.isSearch) {
				draft.autoCompleteKeywords = items;
				draft.searchKeyword = searchKeyword;
				draft.totalMovies = total;
				draft.isAutoComplete = true;
			} else {
				return state
			}
		});
	},
  [EMPTY_AUTO_COMPLETE]: (state, action) => {
		return produce(state, draft => {
			draft.isSearch = false;
			draft.autoCompleteKeywords = [];
			draft.searchKeyword = '';
			draft.totalMovies = 0;
			draft.isSearch = false;
		});
 },
  [SEARCH_RESULT_EMPTY_AUTO_COMPLETE]: (state, action) => {
		return produce(state, draft => {
			draft.autoCompleteKeywords = [];
			draft.searchKeyword = action.payload.searchKeyword;
			draft.totalMovies = 0;
			draft.isAutoComplete = false;
		});
  }
}, initialState);

export default search;