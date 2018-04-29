import { all } from 'redux-saga/effects'
import {
  movieListSaga
} from './search';

export function* rootSaga() {
  yield all([
    movieListSaga()
  ])
}
