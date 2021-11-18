import React, { Component } from 'react';
import './app.css';

export default class App extends Component {
  state = { username: 'Tuan' };


  render() {
    const { username } = this.state;
    return (
      <div>
        {username ? <h1>{`Hello ${username}`}</h1> : <h1>Loading.. please wait!</h1>}
      </div>
    );
  }
}
