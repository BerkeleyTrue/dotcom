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
            About Me
          </h1>
        </header>
        <article>
          <p>
            Hello, I'm berkeley Martinez, I work as a developer in
            San Francisco.
          </p>
          <ul>
            <li>
              Do you need to build a fullstack React.js app?
            </li>
            <li>
              Are you interested in React and the JAM stack?
            </li>
            <li>
              Do you need some node.js advice?
            </li>
            <li>
              Are you a new developer and need a few tutoring sessions?
            </li>
            <li>
              Does you team need advanced Redux training?
            </li>
          </ul>
          <p>
            I can help. Let's talk
          </p>
        </article>
      </div>
    );
  }
}

About.displayName = 'About';
About.propTypes = propTypes;
