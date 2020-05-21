import { createReducer } from 'typesafe-actions';
import produce from 'immer'; 
import poster1 from 'static/images/poster1.jpg';
import poster2 from 'static/images/poster2.jpg';
import poster3 from 'static/images/poster3.jpg';
import poster4 from 'static/images/poster4.jpg';
import poster5 from 'static/images/poster5.jpg';

export interface RandomImagesState {
	randomImage: string;
}

const GET_RANDOM_IMAGE = "randomImages/GET_RANDOM_IMAGE";

export const getRandomImage = createAction(GET_RANDOM_IMAGE);

const initialState = {
  randomImage: ''
};

const randomMovieImages = [poster1, poster2, poster3, poster4, poster5];

export const randomImageLength = randomMovieImages.length;

const randomImages = createReducer(
	{
		[GET_RANDOM_IMAGE] : (state, action: { payload: number }) => 
			produce(state, draft => {
				const randomImage = randomMovieImages[action.payload];
				draft.randomImage = randomImage;
			}),
	},
	initialState
);

export default randomImages;
