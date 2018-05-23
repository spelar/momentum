import {createAction, handleActions} from 'redux-actions';
import { Map } from 'immutable';

export const GET_SEARCH_RESULT_MOVIE_LIST = "GET_SEARCH_RESULT_MOVIE_LIST";
const RESPONSE_SEARCH_RESULT_MOVIE_LIST = "RESPONSE_SEARCH_RESULT_MOVIE_LIST";
const EMPTY_MOVIE_LIST = "EMPTY_MOVIE_LIST";
export const GET_MORE_MOVIE_LIST = "GET_MORE_MOVIE_LIST";
const RESPONSE_MORE_MOVIE_LIST = "RESPONSE_MORE_MOVIE_LIST";
const SET_SCROLL_STATE = "SET_SCROLL_STATE";

export const getSearchResultMovieList = createAction(GET_SEARCH_RESULT_MOVIE_LIST);
export const responseSearchResultMovieList = createAction(RESPONSE_SEARCH_RESULT_MOVIE_LIST);
export const emptyMovieList = createAction(EMPTY_MOVIE_LIST);
export const getMoreMovieList = createAction(GET_MORE_MOVIE_LIST);
export const responseMoreMovieList = createAction(RESPONSE_MORE_MOVIE_LIST);
export const setScrollState = createAction(SET_SCROLL_STATE);

const initialState = Map({
  isSearchResultPage: false,
  movieList: [],
  startIndex: 1,
  isLastMovie: false,
  isScroll: false
});

export default handleActions({
  [RESPONSE_SEARCH_RESULT_MOVIE_LIST]: (state, action) => {
    const movieList = action.payload.items;
    const totalMovie = action.payload.total;
    let isLastMovie = state.get("isLastMovie");
    if (movieList.length === totalMovie || movieList.length > totalMovie) {
      isLastMovie = true;
    } else {
      isLastMovie = false;
    }
    return state.set("movieList", movieList).set("isLastMovie", isLastMovie);
  },
  [EMPTY_MOVIE_LIST]: (state) => {
    return state.set("movieList", []).set("isScroll", false);
  },
  [RESPONSE_MORE_MOVIE_LIST]: (state, action) => {
    let moreMovieList = action.payload.items;
    const startIndex = action.payload.start;
    const totalMovie = action.payload.total;
    let movieList = state.get("movieList");
    let isLastMovie = state.get("isLastMovie");
    moreMovieList = movieList.concat(moreMovieList);
    if (moreMovieList.length === totalMovie) {
      isLastMovie = true;
    } else {
      isLastMovie = false;
    }
    return state.set("movieList", moreMovieList).set("startIndex", startIndex).set("isLastMovie", isLastMovie);
  },
  [SET_SCROLL_STATE]: (state, action) => {
    let isScroll = state.get("isScroll");
    if (action.payload) {
      isScroll = true;
    } else {
      isScroll = false;
    }
    return state.set("isScroll", isScroll);
  }
}, initialState);
