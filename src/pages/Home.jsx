import React, { useState } from 'react';

import {Search} from '../components/Search/index';
import {Display} from '../components/Display/index';
import { Navbar } from '../components/NavBar';
import {LoggedInBar} from '../components/LoggedInBar';

export const Home = (props) => {
  const today = new Date()
  today.setHours(12,0,0);
  today.setDate(today.getDate() + 1)
  
  const [showMessage, setShowMessage] = useState(false);
  const [data, setData] = useState('');
  const [startDate, setStartDate] = useState(today);
  const [cannotSeat, setCannotSeat] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  fetch('/checkToken')
  .then(res => {
    if (res.status === 200) {
      setLoggedIn(true);
    } else {
      const error = new Error(res.error);
      setLoggedIn(false);
      throw error;
    }
  })
  .catch(err => {
    console.error(err);
  });
  
  return (
    <div>
      <div>
      {(<Navbar/>) }
      {/* {(<LoggedInBar />)} */}
      </div>
      <Search 
        setStartDate={setStartDate.bind(this)} 
        setShowMessage={setShowMessage.bind(this)} 
        setData={setData.bind(this)}
        setCannotSeat={setCannotSeat.bind(this)}
        showMessage={showMessage}
        data={data}
        startDate={startDate}
        cannotSeat={cannotSeat}
      />
      <Display 
        setStartDate={setStartDate.bind(this)} 
        setShowMessage={setShowMessage.bind(this)} 
        setData={setData.bind(this)}
        setCannotSeat={setCannotSeat.bind(this)}
        showMessage={showMessage}
        data={data}
        startDate={startDate}
        cannotSeat={cannotSeat}
      />
    </div>
  );
  
}