import React, { Component } from 'react';

export default class Bar extends Component {
  render() {
    const array = new Array(500);
    array.fill(0);

    return (
      <main>
        {array.map((e, i) => (
          <div key={i}>Bar!</div>
        ))}
      </main>
    );
  }
}
