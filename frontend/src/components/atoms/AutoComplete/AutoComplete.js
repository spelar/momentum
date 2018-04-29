import React, {Component} from 'react';
import styles from './AutoComplete.scss';
import {withRouter} from "react-router-dom";

class AutoComplete extends Component {
  render() {
    const {search} = this.props;
    const {history} = this.props;

    const makeSearchMessage = () => {
      return (
        <div>
          <p className={styles.message}>
            <strong>관심있는 영화를<br />
              검색해 보세요 !</strong>
          </p>
        </div>
      );
    };

    const makeSearchList = () => {
      const liStyle = [styles.movie, styles.clearFix].join(' ');
      return search.autoCompleteKeywords.map((movie, i) => {
        return (
          <li key={'movie' + i} className={liStyle}>
            <a target="_blank" href={movie.link}>
              {movie.image !== "" ? <div className={styles.image}><img src={movie.image} alt="영화 포스터" /></div> : <div className={[styles.image, styles.noimage].join(' ')}><span /></div>}
              <div className={styles.info}>
                <div className={styles.clearFix}>
                  <h2 dangerouslySetInnerHTML={{__html: movie.title}} />
                  <span className={styles.pubDate} dangerouslySetInnerHTML={{__html: movie.pubDate}} />
                </div>
              </div>
            </a>
          </li>
        )
      });
    };

    return (
      <div className={styles.autoCompleteList}>
        <ul>
          {search.autoCompleteKeywords.length === 0 && history.location.pathname !== '/searchResult' ? makeSearchMessage() : makeSearchList()}
        </ul>

      </div>
    );
  }
}

export default  withRouter(AutoComplete);
