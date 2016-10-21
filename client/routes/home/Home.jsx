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
          <h1>What up?</h1>
          <h2>It's me, Berks!</h2>
        </header>
        <article>
          <p>
            Hey, not much going on now. Just a log of code.
          </p>
        </article>
      </section>
    );
  }
}
Home.displayName = 'Home';
Home.propTypes = propTypes;
