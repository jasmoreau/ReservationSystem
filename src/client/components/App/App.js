import React, { Component } from 'react';
import './app.css';

export default class App extends Component {
  state = { result: null };

  toggleButtonState = () => {
    let selectedWord = window.getSelection().toString();
    fetch('http://localhost:8080/jason').then(result => {
      this.setState({ result });
    });
  };

  render() {
    const { username } = this.state;
    return (
      <div>
        <button onClick={this.toggleButtonState}> Click me </button>
      </div>
    );
  }
}
