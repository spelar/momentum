import { createAction } from "typesafe-actions";

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