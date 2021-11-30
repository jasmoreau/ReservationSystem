import React, { Component } from 'react';
import { Route, Routes} from 'react-router-dom';
import withAuth from './pages/withAuth';
import {Home} from './pages/Home';
import {Login} from './pages/Login';
import {Register} from './pages/Register';
import {PageNotFound} from './pages/PageNotFound';
import {AboutMe} from './pages/AboutMe';
import { CheckOutForm } from './pages/CheckOutForm';
class App extends Component {
  render() {
    return (
      <div>
        <Routes>
          <Route 
          path="/" element={<Home />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/aboutme" element={<AboutMe/>} />
          <Route path="/checkout" element={< CheckOutForm/>} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    );
  }
}

export default App;
