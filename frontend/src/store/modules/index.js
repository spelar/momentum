import { combineReducers } from 'redux';
import randomImages from './randomImages';
import search from './search';
import searchResult from './searchResult';

const rootReducer = combineReducers({
  randomImages,
  search,
	searchResult
});

export default rootReducer;
