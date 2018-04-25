import fetch from "isomorphic-fetch";

export const getAutoComplete = (searchKeyword) => fetch(`/movies/${encodeURIComponent(searchKeyword)}`).then(res => res.json());
