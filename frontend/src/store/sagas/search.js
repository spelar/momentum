import { put, call, takeLatest } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import * as searchActions from 'store/modules/search';
import {
  getAutoComplete
} from "lib/api/search";


function* getAutoCompleteSaga(action) {
  yield delay(300);
  if (action.payload && action.payload.trim().length > 0) {
    const receiveAutoComplete = yield call(getAutoComplete, action.payload);
    if (action.payload) {
      receiveAutoComplete.searchKeyword = action.payload;
    }
    yield put(searchActions.responseAutoComplete(receiveAutoComplete));
  }
}

export function* autoCompleteSage() {
  yield takeLatest(searchActions.GET_AUTO_COMPLETE, getAutoCompleteSaga)
}
