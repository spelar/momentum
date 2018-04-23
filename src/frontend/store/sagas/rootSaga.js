import { all } from 'redux-saga/effects'
import {
  autoCompleteSage
} from './search';

export function* rootSaga() {
  yield all([
    autoCompleteSage()
  ])
}
