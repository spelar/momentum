import React from 'react';
import './AutoComplete.scss';
import { Item } from '../../store/modules/searchResult';

export interface AutoCompleteProps {
	search: {
		isSearch: boolean;
		autoCompleteKeywords: Item[];
		searchKeyword: string;
		total: number;
		isAutoComplete: boolean;
		searchType: string;
	},
	history: {
		location: {
			pathname: string;
		}
	}
}

const AutoComplete = ({search, history}: AutoCompleteProps) => {
    const makeSearchMessage = () => {
      return (
        <div>
          <p className="message">
            <strong>관심있는 {search.searchType === 'movie' ? '영화를' : '책을'}<br />
              검색해 보세요 !</strong>
          </p>
        </div>
      );
    };

    const makeSearchList = () => {
      return search.autoCompleteKeywords.map((item, i) => {
        return (
          <li key={'item' + i} className="item clearFix">
            <a target="_blank" href={item.link} rel="noopener noreferrer"> 
              {item.image !== "" ? <div className="image"><img src={item.image} alt={search.searchType === 'movie' ? '영화 포스터' : '책 표지 이미지'} /></div> : <div className="image noimage"><span /></div>}
              <div className="info">
                <div className="clearFix">
                  <h2 dangerouslySetInnerHTML={{__html: item.title}} />
                  <span className="pubDate" dangerouslySetInnerHTML={{__html: item.pubDate || item.pubdate}} />
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
