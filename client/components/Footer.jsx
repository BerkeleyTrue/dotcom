import React, { PureComponent } from 'react';
import classnames from 'classnames/bind';

import FA from 'react-fontawesome';

import fa from 'font-awesome/css/font-awesome.css';
import styles from './footer.styl';

const cx = classnames.bind(styles);
const propTypes = {};

export default class Footer extends PureComponent {
  render() {
    return (
      <footer className={ cx('footer') }>
        <a
          href='https://www.freecodecamp.com/about'
          target='_blank'
          >
          <FA
            cssModule={ fa } name='free-code-camp'
            size='3x'
          />
        </a>
        <a
          href='https://www.twitter.com/berkeleytrue'
          target='_blank'
          >
          <FA
            cssModule={ fa } name='twitter'
            size='3x'
          />
        </a>
        <a
          href='https://www.linkedin.com/in/berkeleytrue'
          target='_blank'
          >
          <FA
            cssModule={ fa } name='linkedin'
            size='3x'
          />
        </a>
      </footer>
    );
  }
}
Footer.displayName = 'Footer';
Footer.propTypes = propTypes;
