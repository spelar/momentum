import {createAction, handleActions} from 'redux-actions';

const SEARCH_ICON_CLICK = "SEARCH_ICON_CLICK";
export const GET_AUTO_COMPLETE = "GET_AUTO_COMPLETE";
const RESPONSE_AUTO_COMPLETE = "RESPONSE_AUTO_COMPLETE";
const EMPTY_AUTO_COMPELTE = "EMPTY_AUTO_COMPELTE";

export const searchIconClick = createAction(SEARCH_ICON_CLICK);
export const getAutoComplete = createAction(GET_AUTO_COMPLETE);
export const responseAutoComplete = createAction(RESPONSE_AUTO_COMPLETE);
export const emptyAutoComplete = createAction(EMPTY_AUTO_COMPELTE);

const initialState = {
  isHeaderSearch: false,
  autoCompleteKeywords: [],
  searchKeyword: ''
};

export default handleActions({
  [SEARCH_ICON_CLICK]: (state) => {
    const isHeaderSearch = !state.isHeaderSearch;
    return {...state, "isHeaderSearch": isHeaderSearch}
  },
  [RESPONSE_AUTO_COMPLETE]: (state, action) => {
    const autoCompleteKeywords = action.payload.items;
    const totalMovies = action.payload.total;
    const searchKeyword = action.payload.searchKeyword;
    return {...state, "autoCompleteKeywords": autoCompleteKeywords, "searchKeyword": searchKeyword, "totalMovies": totalMovies}
  },
  [EMPTY_AUTO_COMPELTE] : (state) => {
    return {...state, "autoCompleteKeywords": [], "searchKeyword": ''}
  }
}, initialState);
