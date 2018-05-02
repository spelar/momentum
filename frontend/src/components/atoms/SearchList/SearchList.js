import React, { Component } from 'react';
import styles from './SearchList.scss';
import PropTypes from "prop-types";

class SearchList extends Component {
  render() {
    const {searchResult, moreMovieClick} = this.props;
    const makeNoMovieList = () => {
      return (
        <div>
          <p className={styles.noMovieListMessage}>
            <strong>검색 결과가 없습니다.</strong>
          </p>
        </div>
      )
    };

    const makeSearchList = () => {
      const liStyle = [styles.movie, styles.clearFix].join(' ');
      return searchResult.movieList.map((movie, i) => {
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
          {searchResult.movieList.length === 0 ? makeNoMovieList() : makeSearchList()}
        </ul>
        {searchResult.movieList.length > 0 && searchResult.isLastMovie === false ?
          <div className={styles.moreMovie}>
            <a onClick={moreMovieClick}>
            더보기 <i className="momentum-icon momentum-icon-long-arrow-right" />
            </a>
          </div>
        : ""}
      </div>
    );
  }
}

SearchList.propTypes = {
  searchResult: PropTypes.object.isRequired,
  moreMovieClick: PropTypes.func.isRequired
};

export default SearchList;
