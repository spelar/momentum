import fetch from 'isomorphic-fetch';

export interface searchDataState {
	startIndex: number;
	searchKeyword: string;
}

export const getMovieList = (searchData: searchDataState) => {
  let indexParam = "";
  if(searchData.startIndex) {
    indexParam = "&start=" + searchData.startIndex;
  }
  return fetch('/movies/?query=' + encodeURIComponent(searchData.searchKeyword) + indexParam).then(res => res.json());
}

export const getBookList = (searchData: searchDataState) => {
	return fetch('/books/?query=' + encodeURIComponent(searchData.searchKeyword)).then(res => res.json());
}
