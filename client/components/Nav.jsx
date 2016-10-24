import React, { Component } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames/bind';

import style from './nav.styl';
// import logo from '../../images/logo.gif';

const cx = classnames.bind(style);
const propTypes = {};

export default class Nav extends Component {

  render() {
    return (
      <nav className={ cx('navbar') }>
        <div className={ cx('brand') }>
          <Link to='/' />
        </div>
        <ul>
          <Link to='/'>
            <li>
              Home
            </li>
          </Link>
          <Link to='/about'>
            <li>
              About
            </li>
          </Link>
        </ul>
      </nav>
    );
  }
}

Nav.propTypes = propTypes;
