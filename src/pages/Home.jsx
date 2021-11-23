import React, { useState } from 'react';

import {Search} from '../components/Search/index';
import {Display} from '../components/Display/index';
import { Navbar } from '../components/NavBar';

export const Home = (props) => {
  const today = new Date()
  today.setHours(12,0,0);
  today.setDate(today.getDate() + 1)
  
  const [showMessage, setShowMessage] = useState(false);
  const [data, setData] = useState('');
  const [startDate, setStartDate] = useState(today);
  const [cannotSeat, setCannotSeat] = useState(false);
  
  return (
    <div>
      <Navbar/>
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