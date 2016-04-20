import React, { Component } from 'react';

export default class Bar extends Component {
  render() {
    const array = new Array(500);
    array.fill(0);

    return (
      <div>
        {array.map((e, i) => (
          <div key={i}>Bar!</div>
        ))}
      </div>
    );
  }
}
