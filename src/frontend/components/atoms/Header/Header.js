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
    return (
      <div>
        <div className={[styles.header, styles.clearFix].join(' ')}>
          <h1>
            <Link to="/search" className={styles.logo}>Momentum</Link>
          </h1>
          <div className={styles.menu}>
            <a className={styles.btnSearch}>
              <i className="momentum-icon momentum-icon-search" />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
