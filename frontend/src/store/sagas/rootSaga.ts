import { all } from 'redux-saga/effects'
import {
  dataListSaga
} from './search';

export function* rootSaga() {
  yield all([
    dataListSaga()
  ])
}
