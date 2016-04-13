import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import window from 'global/window';
import document from 'global/document';

export default class KeepElementSize extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.object.isRequired,
  };

  componentWillMount() {
    const { name } = this.props;
  }

  componentDidMount() {
    const { name } = this.props;
    setElementSize(name, ReactDOM.findDOMNode(this));
  }

  componentDidUpdate(prevProps, prevState) {
    const { name } = this.props;
    setElementSize(name, ReactDOM.findDOMNode(this));
  }

  render() {
    const { name, children } = this.props;
    const style = getElementSize(name);

    return (
      <div style={style}>
        {children}
      </div>
    );
  }
}

function getElementSize(name) {
  const key = getKey(name);
  const { history } = window;
  if (!history || !history.state || !history.state[key] || !history.state[key]) {
    return {};
  }

  return history.state[getKey(name)];
}

function setElementSize(name, element) {
  const key = getKey(name);
  const { history, location } = window;
  if (!history || !history.state || !history.replaceState || !location) {
    return;
  }

  const style = { width: element.scrollWidth, height: element.scrollHeight };
  history.replaceState({ ...history.state, [key]: style }, document.title, location.href);
}

function getKey(name) {
  return `elementSize-${name}`;
}
