import {createAction, handleActions} from 'redux-actions';

export const GET_SEARCH_RESULT_MOVIE_LIST = "GET_SEARCH_RESULT_MOVIE_LIST";
const RESPONSE_SEARCH_RESULT_MOVIE_LIST = "RESPONSE_SEARCH_RESULT_MOVIE_LIST";
const EMPTY_MOVIE_LIST = "EMPTY_MOVIE_LIST";
export const GET_MORE_MOVIE_LIST = "GET_MORE_MOVIE_LIST";
const RESPONSE_MORE_MOVIE_LIST = "RESPONSE_MORE_MOVIE_LIST";

export const getSearchResultMovieList = createAction(GET_SEARCH_RESULT_MOVIE_LIST);
export const responseSearchResultMovieList = createAction(RESPONSE_SEARCH_RESULT_MOVIE_LIST);
export const emptyMovieList = createAction(EMPTY_MOVIE_LIST);
export const getMoreMovieList = createAction(GET_MORE_MOVIE_LIST);
export const responseMoreMovieList = createAction(RESPONSE_MORE_MOVIE_LIST);

const initialState = {
  isSearchResultPage: false,
  movieList: [],
  startIndex: 1,
  isLastMovie: false
};

export default handleActions({
  [RESPONSE_SEARCH_RESULT_MOVIE_LIST]: (state, action) => {
    const movieList = action.payload.items;
    const totalMovie = action.payload.total;
    let isLastMovie = state.isLastMovie;
    if (movieList.length === totalMovie || movieList.length > totalMovie) {
      isLastMovie = true;
    } else {
      isLastMovie = false;
    }
    return {...state, "movieList": movieList, "isLastMovie": isLastMovie}
  },
  [EMPTY_MOVIE_LIST]: (state) => {
    return {...state, "movieList": []}
  },
  [RESPONSE_MORE_MOVIE_LIST]: (state, action) => {
    const moreMovieList = action.payload.items;
    const startIndex = action.payload.start;
    const totalMovie = action.payload.total;
    let movieList = state.movieList;
    let isLastMovie = state.isLastMovie;
    moreMovieList.map((movie) => {
      return movieList.push(movie);
    });
    if (movieList.length === totalMovie) {
      isLastMovie = true;
    } else {
      isLastMovie = false;
    }
    return {...state, "movieList": movieList, "startIndex": startIndex, "isLastMovie": isLastMovie}
  }
}, initialState);