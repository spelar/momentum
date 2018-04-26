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
        const makeActorList = () => {
          let actor = movie.actor.replace(/\|/gi, ", ").slice(0,-2);
          return (
            <span dangerouslySetInnerHTML={{__html: actor}}/>
          )
        };
        return (
          <li key={'movie' + i} className={liStyle}>
            <a target="_blank" href={movie.link}>
              {movie.image !== "" ? <div className={styles.image}><img src={movie.image} alt="영화 포스터" /></div> : <div className={[styles.image, styles.noimage].join(' ')}><span /></div>}
              <div className={styles.info}>
                <div className={styles.clearFix}>
                  <h2 dangerouslySetInnerHTML={{__html: movie.title}} /><span className={styles.pubDate}> (<span dangerouslySetInnerHTML={{__html: movie.pubDate}} />)</span>
                </div>
                <div className={styles.userRating}>
                  <i className="momentum-icon momentum-icon-star" />
                  <span className={styles.score} dangerouslySetInnerHTML={{__html: movie.userRating}}/>
                </div>
                <div className={styles.actor}>
                  {makeActorList()}
                </div>
              </div>
            </a>
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
