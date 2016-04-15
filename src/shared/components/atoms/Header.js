import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Foo extends Component {
  render() {
    return (
      <div>
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
