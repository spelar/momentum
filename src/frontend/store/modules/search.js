import {createAction, handleActions} from 'redux-actions';

const SEARCH_ICON_CLICK = "SEARCH_ICON_CLICK";

export const searchIconClick = createAction(SEARCH_ICON_CLICK);

const initialState = {
  isHeaderSearch: false
};

export default handleActions({
  [SEARCH_ICON_CLICK]: (state) => {
    const isHeaderSearch = !state.isHeaderSearch;
    return {...state, "isHeaderSearch": isHeaderSearch}
  }
}, initialState);
