import {createAction, handleActions} from 'redux-actions';

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

const initialState = {
  autoCompleteKeywords: [],
  searchKeyword: '',
  totalMovies: 0,
  isAutoComplete: false,
};

export default handleActions({
  [RESPONSE_MOVIE_LIST]: (state, action) => {
    const autoCompleteKeywords = action.payload.items;
    const totalMovies = action.payload.total;
    const searchKeyword = action.payload.searchKeyword;
    return {...state, "autoCompleteKeywords": autoCompleteKeywords, "searchKeyword": searchKeyword, "totalMovies": totalMovies, "isAutoComplete": true}
  },
  [EMPTY_AUTO_COMPLETE]: (state) => {
    return {...state, "autoCompleteKeywords": [], "searchKeyword": '', "totalMovies": 0, "isAutoComplete": false}
  },
  [SEARCH_RESULT_EMPTY_AUTO_COMPLETE]: (state, action) => {
    const searchKeyword = action.payload.searchKeyword;
    return {...state, "autoCompleteKeywords": [], "searchKeyword": searchKeyword, "totalMovies": 0, "isAutoComplete": false}
  }
}, initialState);
