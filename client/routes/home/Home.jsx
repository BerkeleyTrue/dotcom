import React, { Component } from 'react';
import classnames from 'classnames/bind';

import styles from './home.styl';

const cx = classnames.bind(styles);

const propTypes = {};
export default class Home extends Component {
  render() {
    return (
      <section className={ cx('home') }>
        <header>
          <h1>HELLO</h1>
          <h2>It's me, Berks!</h2>
        </header>
      </section>
    );
  }
}
Home.displayName = 'Home';
Home.propTypes = propTypes;
