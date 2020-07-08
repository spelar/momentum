import { createAction } from "typesafe-actions";
import { Movie } from "../searchResult";

export const SET_SEARCH_STATE = 'search/SET_SEARCH_STATE';
export const GET_MOVIE_LIST = 'search/GET_MOVIE_LIST';
export const RESPONSE_MOVIE_LIST = 'search/RESPONSE_MOVIE_LIST';
export const EMPTY_AUTO_COMPLETE = 'search/EMPTY_AUTO_COMPLETE';
export const SEARCH_RESULT_EMPTY_AUTO_COMPLETE = 'search/SEARCH_RESULT_EMPTY_AUTO_COMPLETE';

export const setSearchState = createAction(SET_SEARCH_STATE)<boolean>();
export const getMovieList= createAction(GET_MOVIE_LIST)<{
	searchKeyword: string;
}>();
export const responseMovieList = createAction(RESPONSE_MOVIE_LIST)<{
	items: Movie[];
	total: number;
	searchKeyword: string;
}>();
export const emptyAutoComplete = createAction(EMPTY_AUTO_COMPLETE)();
export const searchResultEmptyAutoComplete = createAction(SEARCH_RESULT_EMPTY_AUTO_COMPLETE)<{
	searchKeyword: string;
}>();