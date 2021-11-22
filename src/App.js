import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import withAuth from './pages/withAuth';
import Home from './pages/Home';
import Secret from './pages/Secret';
import Login from './pages/Login';
import Register from './pages/Register';
import NavBar from './components/NavBar';
import Search from './components/Search';
import Display from './components/Display';
class App extends Component {
  constructor(props) {
    super(props); 
    const today = new Date()
    today.setHours(12,0,0);
    today.setDate(today.getDate() + 1)
    this.state = { 
      showMessage: false, 
      data: '',
      startDate: today,
      numPeople: 1,
      cannotSeat: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.changeData = this.changeData.bind(this)
    this.cannotSeat = this.cannotSeat.bind(this)
    this.showMessage = this.showMessage.bind(this)
  }

  handleChange(date){
    this.setState({
      startDate: date
    })
  }

  changeData(data){
    this.setState({
      data: data
    })
    console.log("DATA")
    console.log(this.state.data)
  }s

  cannotSeat(bool){
    this.setState({
      cannotSeat: bool
    })
  }

  showMessage = (bool) => {
    this.setState({
      showMessage: bool
    });
  }

  render() {
    return (
      <div>

        <NavBar />
        <Search 
          handleChange={this.handleChange} 
          showMessage={this.showMessage} 
          changeData={this.changeData}
          cannotSeat={this.cannotSeat}
          state={this.state} 
        />
        <Display state={this.state}/>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/secret" component={withAuth(Secret)} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>

      </div>
    );
  }
}

export default App;
