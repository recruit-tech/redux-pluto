import React, { Component } from 'react';
import { Link } from 'react-router';
import { createLocal } from '../utils/localnames';
import styles from './Header.scss';

const { localNames: local } = createLocal(styles);

export default class Header extends Component {
  render() {
    return (
      <div className={local('main')}>
        <header>
          Links:
          {' '}
          <Link key="home" to="/">Home</Link>
          {' '}
          <Link key="foo" to="/foo">Foo</Link>
          {' '}
          <Link key="bar" to="/bar">Bar</Link>
          {' '}
          <Link key="style" to="/style">Style</Link>
          {' '}
          <Link key="login" to="/login">Login</Link>
          {' '}
          <Link key="logout" to="/logout">Logout</Link>
        </header>
      </div>
    );
  }
}
