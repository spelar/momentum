import { put, call, takeLatest, delay } from 'redux-saga/effects'
import * as searchActions from '../modules/search';
import * as searchResultSearchActions from '../modules/searchResult';
import {
  getMovieList, getBookList
} from "../../lib/api/search";
import { GET_LIST } from "../modules/search";
import {GET_SEARCH_RESULT_MOVIE_LIST, GET_MORE_MOVIE_LIST} from "../modules/searchResult";

export interface searchActionState {
	type: string;
	payload: {
		searchKeyword: string;
		startIndex: number;
	}
}

function* getMovieListSaga(action: searchActionState) {
  yield delay(300);
  if (action.payload.searchKeyword && action.payload.searchKeyword.trim().length > 0) {
    const receiveMovieList = yield call(getMovieList, action.payload);
    if (action.payload.searchKeyword) {
      receiveMovieList.searchKeyword = action.payload.searchKeyword;
    }
    if (action.type === GET_LIST) {
      yield put(searchActions.responseMovieList(receiveMovieList));
    } else if (action.type === GET_SEARCH_RESULT_MOVIE_LIST) {
      yield put(searchResultSearchActions.responseSearchResultMovieList(receiveMovieList));
    } else if (action.type === GET_MORE_MOVIE_LIST) {
      yield put(searchResultSearchActions.responseMoreMovieList(receiveMovieList));
    }
  }
}

function* getBookListSaga(action: searchActionState) {
	yield delay(300);
	try {
		const receiveBookList = yield call(getBookList, action.payload);
		console.log(receiveBookList)
	} catch (error) {
		console.log(error);
	}
}

export function* movieListSaga() {
  yield takeLatest(searchActions.GET_LIST, getMovieListSaga);
  yield takeLatest(searchResultSearchActions.GET_SEARCH_RESULT_MOVIE_LIST, getMovieListSaga);
  yield takeLatest(searchResultSearchActions.GET_MORE_MOVIE_LIST, getMovieListSaga);
	yield takeLatest(searchActions.GET_BOOK_LIST, getBookListSaga);
}
