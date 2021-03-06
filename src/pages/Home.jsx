import React, { useEffect, useState } from 'react';

import {Search} from '../components/Search/index';
import {Display} from '../components/Display/index';
import { Navbar } from '../components/NavBar';
import {LoggedInBar} from '../components/LoggedInBar';
import {Combinations} from '../components/Combinations'


export const Home = (props) => {
  const today = new Date()
  today.setHours(12,0,0);
  today.setDate(today.getDate() + 1)
  
  const tomorrow = new Date()
  tomorrow.setDate(today.getDate()+1)

  const [showMessage, setShowMessage] = useState(false);
  const [data, setData] = useState('');
  const [startDate, setStartDate] = useState(today);
  
  const [dateT, setDateT] = useState('');
  const [cannotSeat, setCannotSeat] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [highTraffic, setHighTraffic] = useState(false);
  const [reservationPlaced, setReservationPlaced] = useState(false);


  const getData = async () => {
    const response = await fetch('/getData',{
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
    const jsonResponse = await response.json();
    const jsonResponse2 = [JSON.parse(JSON.stringify(jsonResponse[0], function(key, value) {if(value === null)  return ''; return value;}))]
      if(jsonResponse[0].userid != null)
      {  setLoggedIn(true);
        setUserData(jsonResponse2);
        console.log(jsonResponse2)}
      else {
        setLoggedIn(false);
        setUserData(jsonResponse2);
        console.log(userData)
      }

  };

  useEffect(async () => {
    await getData();
  }, []);

  return (
    <div>
      <div>
      {!loggedIn &&<div><Navbar/></div> }
      {loggedIn && <div><LoggedInBar/></div>}
      </div>
      <Search 
        setStartDate={setStartDate.bind(this)} 
        setShowMessage={setShowMessage.bind(this)} 
        setData={setData.bind(this)}
        setCannotSeat={setCannotSeat.bind(this)}
        setDateT={setDateT.bind(this)}
        setHighTraffic={setHighTraffic.bind(this)}
        showMessage={showMessage}
        data={data}
        startDate={startDate}
        cannotSeat={cannotSeat}
        dateT={dateT}
        highTraffic={highTraffic}
      />
      <Display 
        setStartDate={setStartDate.bind(this)} 
        setShowMessage={setShowMessage.bind(this)} 
        setData={setData.bind(this)}
        setCannotSeat={setCannotSeat.bind(this)}
        setDateT={setDateT.bind(this)}
        setHighTraffic={setHighTraffic.bind(this)}
        setReservationPlaced={setReservationPlaced.bind(this)}
        showMessage={showMessage}
        data={data}
        startDate={startDate}
        cannotSeat={cannotSeat}
        dateT={dateT}
        highTraffic={highTraffic}
        userData={userData}
        reservationPlaced={reservationPlaced}
      />
    </div>
  );
  
}