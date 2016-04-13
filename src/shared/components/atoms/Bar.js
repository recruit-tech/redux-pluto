import React, { Component } from 'react';

export default class Bar extends Component {
  render() {
    const array = new Array(500);
    for (let i = 0; i < array.length; ++i) {
      array[i] = i;
    }

    return (
      <div>
        {array.map((e) => (
          <div key={e}>Bar!!!</div>
        ))}
      </div>
    );
  }
}
