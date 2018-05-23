import {createAction, handleActions} from 'redux-actions';
import { Map } from 'immutable';

const SEARCH_ICON_CLICK = "SEARCH_ICON_CLICK";
export const GET_MOVIE_LIST = "GET_MOVIE_LIST";
const RESPONSE_MOVIE_LIST = "RESPONSE_MOVIE_LIST";
const EMPTY_AUTO_COMPLETE = "EMPTY_AUTO_COMPLETE";
const SEARCH_RESULT_EMPTY_AUTO_COMPLETE = "SEARCH_RESULT_EMPTY_AUTO_COMPLETE";

export const searchIconClick = createAction(SEARCH_ICON_CLICK);
export const getMovieList= createAction(GET_MOVIE_LIST);
export const responseMovieList = createAction(RESPONSE_MOVIE_LIST);
export const emptyAutoComplete = createAction(EMPTY_AUTO_COMPLETE);
export const searchResultEmptyAutoComplete = createAction(SEARCH_RESULT_EMPTY_AUTO_COMPLETE)

const initialState = Map({
  autoCompleteKeywords: [],
  searchKeyword: '',
  totalMovies: 0,
  isAutoComplete: false,
});

export default handleActions({
  [RESPONSE_MOVIE_LIST]: (state, action) => {
    const autoCompleteKeywords = action.payload.items;
    const totalMovies = action.payload.total;
    const searchKeyword = action.payload.searchKeyword;
    return state.set("autoCompleteKeywords", autoCompleteKeywords).set("searchKeyword", searchKeyword).set("totalMovies", totalMovies).set("isAutoComplete", true);
  },
  [EMPTY_AUTO_COMPLETE]: (state) => {
    return state.set("autoCompleteKeywords", []).set("searchKeyword", '').set("totalMovies", 0).set("isAutoComplete", false);
  },
  [SEARCH_RESULT_EMPTY_AUTO_COMPLETE]: (state, action) => {
    const searchKeyword = action.payload.searchKeyword;
    return state.set("autoCompleteKeywords", []).set("searchKeyword", searchKeyword).set("totalMovies", 0).set("isAutoComplete", false);
  }
}, initialState);
