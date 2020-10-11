import { put, call, takeLatest, delay } from 'redux-saga/effects'
import * as searchActions from '../modules/search';
import * as searchResultSearchActions from '../modules/searchResult';
import {
  getList
} from "../../lib/api/search";
import { GET_LIST } from "../modules/search";
import {GET_SEARCH_RESULT_MOVIE_LIST, GET_MORE_MOVIE_LIST} from "../modules/searchResult";

export interface searchActionState {
	type: string;
	payload: {
		searchKeyword: string;
		startIndex: number;
		searchType: string;
	}
}

function* getListSaga(action: searchActionState) {
  yield delay(300);
	try {
		if (action.payload.searchKeyword && action.payload.searchKeyword.trim().length > 0) {
    const receiveMovieList = yield call(getList, action.payload);
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
	} catch (error) {
		console.log(error);
	}
}

export function* dataListSaga() {
  yield takeLatest(searchActions.GET_LIST, getListSaga);
  yield takeLatest(searchResultSearchActions.GET_SEARCH_RESULT_MOVIE_LIST, getListSaga);
  yield takeLatest(searchResultSearchActions.GET_MORE_MOVIE_LIST, getListSaga);
}
