import React, { PureComponent } from 'react';
import classnames from 'classnames/bind';

import styles from './about.styl';

const cx = classnames.bind(styles);
const propTypes = {};

export default class About extends PureComponent {
  render() {
    return (
      <div className={ cx('about') }>
        <header>
          <h1>
            About Us
          </h1>
        </header>
        <article>
          Hey I'm berkeley :)
        </article>
      </div>
    );
  }
}

About.displayName = 'About';
About.propTypes = propTypes;
