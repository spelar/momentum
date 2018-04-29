import fetch from "isomorphic-fetch";

export const getMovieList = (searchData) => {
  let indexParam = "";
  if(searchData.startIndex) {
    indexParam = "&start=" + searchData.startIndex;
  }
  return fetch('/movies/?query=' + encodeURIComponent(searchData.searchKeyword) + indexParam).then(res => res.json());
}
