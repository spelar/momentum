import { combineReducers } from 'redux';
import randomImages, { RandomImagesState } from './randomImages';
import search from './search';
import searchResult from './searchResult';

export type RootState = {
	randomImages: RandomImagesState;
};

const rootReducer = combineReducers({
  randomImages,
  search,
	searchResult
});

export default rootReducer;
