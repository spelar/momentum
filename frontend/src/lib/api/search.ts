import fetch from 'isomorphic-fetch';

export interface searchDataState {
	startIndex: number;
	searchKeyword: string;
	searchType: string;
}

export const getList = (searchData: searchDataState) => {
  let indexParam = '';
  if (searchData.startIndex) {
    indexParam = '&start=' + searchData.startIndex;
  }
  return fetch('/' + searchData.searchType + '/?query=' + encodeURIComponent(searchData.searchKeyword) + indexParam).then(res => res.json());
}