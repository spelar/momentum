import produce from 'immer'; 
import { createReducer } from 'typesafe-actions';
import { SearchAction } from './types';
import { SET_SEARCH_STATE, RESPONSE_MOVIE_LIST, EMPTY_AUTO_COMPLETE, SET_SEARCH_KEYWORD } from './actions';
import { Movie } from '../searchResult';

export interface SearchState {
	isSearch: boolean;
	autoCompleteKeywords: Movie[];
  searchKeyword: string;
  totalMovies: number;
  isAutoComplete: boolean;
}

const initialState: SearchState = {
	isSearch: false,
  autoCompleteKeywords: [],
  searchKeyword: '',
  totalMovies: 0,
  isAutoComplete: false,
};

const search = createReducer<SearchState, SearchAction>(initialState, {
	[SET_SEARCH_STATE]: (state, action) => 
		produce(state, draft => {
			if (action.payload) {
				draft.isSearch = true;
			} else {
				draft.isSearch = false;
			}
		}),
  [RESPONSE_MOVIE_LIST]: (state, action) => 
		produce(state, draft => {
			const { items, total, searchKeyword} = action.payload;
			if (state.isSearch) {
				draft.autoCompleteKeywords = items;
				draft.searchKeyword = searchKeyword;
				draft.totalMovies = total;
				draft.isAutoComplete = true;
			} else {
				return state
			}
		}),
  [EMPTY_AUTO_COMPLETE]: (state, action) => 
		produce(state, draft => {
			draft.isSearch = false;
			draft.autoCompleteKeywords = [];
			draft.searchKeyword = '';
			draft.totalMovies = 0;
			draft.isAutoComplete = false;
		}),
  [SET_SEARCH_KEYWORD]: (state, action) => 
		produce(state, draft => {
			draft.autoCompleteKeywords = [];
			draft.searchKeyword = JSON.parse(action.payload.searchKeyword);
			draft.totalMovies = 0;
			draft.isAutoComplete = false;
		}),
});

export default search;