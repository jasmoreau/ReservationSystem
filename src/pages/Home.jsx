import React, { useEffect, useState } from 'react';

import {Search} from '../components/Search/index';
import {Display} from '../components/Display/index';
import { Navbar } from '../components/NavBar';
import {LoggedInBar} from '../components/LoggedInBar';

const getData = async() => {
  await fetch('/getdata', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
        })
  .then(res => {
    return res;
  })
  .catch(err => {
    console.error(err);
  });
}

export const Home = (props) => {
  const today = new Date()
  today.setHours(12,0,0);
  today.setDate(today.getDate() + 1)
  
  const [showMessage, setShowMessage] = useState(false);
  const [data, setData] = useState('');
  const [startDate, setStartDate] = useState(today);
  const [dateT, setDateT] = useState('');
  const [cannotSeat, setCannotSeat] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const res = getData();
    console.log(res.status);
    if (res.status === 200) {
      setLoggedIn(true);
      setUserData(res.json());
      console.log(res.json());
    } else {
      const error = new Error(res.error);
      setLoggedIn(false);
    }
  }, [userData, loggedIn]);
  

  
  return (
    <div>
      <div>
      <Navbar/>
      {/* {<LoggedInBar/>} */}
      </div>
      <Search 
        setStartDate={setStartDate.bind(this)} 
        setShowMessage={setShowMessage.bind(this)} 
        setData={setData.bind(this)}
        setCannotSeat={setCannotSeat.bind(this)}
        setDateT={setDateT.bind(this)}
        showMessage={showMessage}
        data={data}
        startDate={startDate}
        cannotSeat={cannotSeat}
        dateT={dateT}
      />
      <Display 
        setStartDate={setStartDate.bind(this)} 
        setShowMessage={setShowMessage.bind(this)} 
        setData={setData.bind(this)}
        setCannotSeat={setCannotSeat.bind(this)}
        setDateT={setDateT.bind(this)}
        showMessage={showMessage}
        data={data}
        startDate={startDate}
        cannotSeat={cannotSeat}
        dateT={dateT}
      />
    </div>
  );
  
}