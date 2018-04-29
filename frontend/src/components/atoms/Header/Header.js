import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import styles from './Header.scss';
import AutoComplete from 'components/atoms/AutoComplete/AutoComplete';

class Header extends Component {
  componentDidMount() {
    const {history} = this.props;
    const params = history.location.search;
    const parsed = queryString.parse(params);
    if (history.location.pathname === '/searchResult') {
      this.searchInput.value = parsed.search;
    }
  }

  render() {
    const {search, searchInputKeyUp, searchBtnClick} = this.props;

    return (
      <div>
        <div className={[styles.header, styles.clearFix].join(' ')}>
          <h1>
            <Link to="/search" className={styles.logo}>Momentum</Link>
          </h1>
          <div className={styles.headerSearch}>
            <input className={styles.input} onKeyUp={searchInputKeyUp} type="text" placeholder="영화를 검색해보세요." title="검색어 입력" ref={(ref) => this.searchInput = ref} />
            <a className={[styles.btn, styles.btnSearch].join(' ')} onClick={searchBtnClick}><i className="momentum-icon momentum-icon-search" /></a>
          </div>
        </div>
        <AutoComplete
          search={search}
        />
      </div>
    );
  }
}

Header.propTypes = {
  search: PropTypes.object.isRequired,
  searchInputKeyUp: PropTypes.func.isRequired,
  searchBtnClick: PropTypes.func.isRequired
};

export default withRouter(Header);
