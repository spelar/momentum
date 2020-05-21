import { combineReducers } from 'redux';
import randomImages, { RandomImagesState } from './randomImages';
import search, { SearchState } from './search';
import searchResult from './searchResult';

export type RootState = {
	randomImages: RandomImagesState;
	search: SearchState;
};

const rootReducer = combineReducers({
  randomImages,
  search,
	searchResult
});

export default rootReducer;
