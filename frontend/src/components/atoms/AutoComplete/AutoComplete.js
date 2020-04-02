import React, {Component} from 'react';
import './AutoComplete.scss';
import {withRouter} from "react-router-dom";
import PropTypes from 'prop-types';

class AutoComplete extends Component {
  render() {
    const {search, history} = this.props;
    const makeSearchMessage = () => {
      return (
        <div>
          <p className="message">
            <strong>관심있는 영화를<br />
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
}

AutoComplete.propTypes = {
  search: PropTypes.object.isRequired
};

export default  withRouter(AutoComplete);
