import {createAction, handleActions} from 'redux-actions';
import { Map } from 'immutable';
import poster1 from 'static/images/poster1.jpg';
import poster2 from 'static/images/poster2.jpg';
import poster3 from 'static/images/poster3.jpg';
import poster4 from 'static/images/poster4.jpg';
import poster5 from 'static/images/poster5.jpg';

const GET_RANDOM_IMAGE = "GET_RANDOM_IMAGE";

export const getRandomImage = createAction(GET_RANDOM_IMAGE);


const initialState = Map({
  randomImage: ''
});


const randomImages = [poster1, poster2, poster3, poster4, poster5];

export const randomImageLength = randomImages.length;

export default handleActions({
  [GET_RANDOM_IMAGE] : (state, {payload: index}) => {
    const randomImage = randomImages[index];
    return state.set("randomImage", randomImage);
  }
}, initialState);
