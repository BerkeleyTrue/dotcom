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
          Hello, I'm berkeley Martinez, I work as a developer in
          San Francisco.
          <ul>
            <li>
              Need to build a fullstack React.js app?
            </li>
            <li>
              Looking to move to the JAM stack?
            </li>
            <li>
              Need some advice node.js advice?
            </li>
            <li>
              Are you a new developer and need a few tutoring sessions?
            </li>
          </ul>
          I can help. Let's talk
        </article>
      </div>
    );
  }
}

About.displayName = 'About';
About.propTypes = propTypes;
