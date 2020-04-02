import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import './Header.scss';
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
    const {search, searchInputKeyUp, searchBtnClick, logoClick, searchResult} = this.props;
    return (
      <div>
        <div className={searchResult.isScroll === true && search.isAutoComplete === false ? "header clearFix headerFixed" : "header clearFix"}>
          <h1>
            <Link to="/search" className="logo" onClick={logoClick}>Momentum</Link>
          </h1>
          <div className="headerSearch">
            <input className="input" onKeyUp={searchInputKeyUp} type="text" placeholder="영화를 검색해보세요." title="검색어 입력" ref={(ref) => this.searchInput = ref} />
            <button className="btn btnSearch" onClick={searchBtnClick}><i className="momentum-icon momentum-icon-search"><span className="screenReaderOnly">검색</span></i></button>
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
  searchBtnClick: PropTypes.func.isRequired,
  logoClick: PropTypes.func
};

export default withRouter(Header);
