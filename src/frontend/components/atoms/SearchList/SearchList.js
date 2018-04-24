import React, { Component } from 'react';
import styles from './SearchList.scss';

class SearchList extends Component {
  render() {
    const {search} = this.props;

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
            <div className={styles.image}>
              <img src={movie.image} alt="영화 포스터" />
            </div>
            <div className={styles.info}>
              <h2 dangerouslySetInnerHTML={{__html: movie.title}} />
              <span>{movie.pubDate}</span>
            </div>
          </li>
        )
      });
    };

    return (
      <div className={styles.searchList}>
        <ul>
          {search.autoCompleteKeywords.length > 0 ? makeSearchList() : makeSearchMessage()}
        </ul>

      </div>
    );
  }
}

export default SearchList;