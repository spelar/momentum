import produce from 'immer'; 
import { GET_RANDOM_IMAGE } from './actions';
import { createReducer } from 'typesafe-actions';
import { RandomImagesAction } from './types';
import poster1 from 'static/images/poster1.jpg';
import poster2 from 'static/images/poster2.jpg';
import poster3 from 'static/images/poster3.jpg';
import poster4 from 'static/images/poster4.jpg';
import poster5 from 'static/images/poster5.jpg';

export interface RandomImagesState {
	randomImage: string;
}

const initialState: RandomImagesState = {
  randomImage: ''
};

const randomMovieImages = [poster1, poster2, poster3, poster4, poster5];

export const randomImageLength = randomMovieImages.length;

const randomImages = createReducer<RandomImagesState, RandomImagesAction>(initialState, {
	[GET_RANDOM_IMAGE] : (state, action) => 
		produce(state, draft => {
			const randomImage = randomMovieImages[action.payload];
			draft.randomImage = randomImage;
		}),
});

export default randomImages;