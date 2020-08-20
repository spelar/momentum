import React from 'react';
import './AutoComplete.scss';
import { Movie } from '../../store/modules/searchResult';

export interface AutoCompleteProps {
	search: {
		isSearch: boolean;
		autoCompleteKeywords: Movie[];
		searchKeyword: string;
		totalMovies: number;
		isAutoComplete: boolean;
	},
	history: {
		location: {
			pathname: string;
		}
	},
	type: string;
}

const AutoComplete = ({search, history, type}: AutoCompleteProps) => {
    const makeSearchMessage = () => {
      return (
        <div>
          <p className="message">
            <strong>관심있는 {type === 'movie' ? '영화를' : '책을'}<br />
              검색해 보세요 !</strong>
          </p>
        </div>
      );
    };

    const makeSearchList = () => {
      return search.autoCompleteKeywords.map((movie, i) => {
        return (
          <li key={'movie' + i} className="movie clearFix">
            <a target="_blank" href={movie.link} rel="noopener noreferrer"> 
              {movie.image !== "" ? <div className="image"><img src={movie.image} alt="영화 포스터" /></div> : <div className="image noimage"><span /></div>}
              <div className="info">
                <div className="clearFix">
                  <h2 dangerouslySetInnerHTML={{__html: movie.title}} />
                  <span className="pubDate" dangerouslySetInnerHTML={{__html: movie.pubDate}} />
                </div>
              </div>
            </a>
          </li>
        )
      });
    };

    return (
      <div className="autoCompleteList">
        <ul>
          {search.autoCompleteKeywords.length === 0 && history.location.pathname !== '/searchResult' ? makeSearchMessage() : makeSearchList()}
        </ul>

      </div>
    );
  }

export default AutoComplete;
