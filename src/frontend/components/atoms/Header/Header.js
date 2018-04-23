import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import queryString from 'query-string';
import styles from './Header.scss';

class Header extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {search, searchIconClick, searchInputKeyUp} = this.props;

    const makeHeaderSearch = () => {
      return (
        <div className={styles.headerSearch}>
          <input className={styles.input} onKeyUp={searchInputKeyUp} type="text" placeholder="영화를 검색해보세요." title="검색어 입력" ref={(ref) => this.searchInput = ref} />
          <a className={[styles.btn, styles.btnSearch].join(' ')}><i className="momentum-icon momentum-icon-search" /></a>
        </div>
      );
    };

    return (
      <div>
        <div className={[styles.header, styles.clearFix].join(' ')}>
          <h1>
            <Link to="/search" className={styles.logo}>Momentum</Link>
          </h1>
          <div className={styles.menu}>
            <a className={styles.btnSearch} onClick={searchIconClick}>
              <i className="momentum-icon momentum-icon-search" />
            </a>
          </div>
        </div>
        {search.isHeaderSearch ? makeHeaderSearch() : ''}
      </div>
    );
  }
}

export default withRouter(Header);
