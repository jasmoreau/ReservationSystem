import {React, useState}  from 'react';
import {Combinations} from '../components/Combinations';
import { LoggedInBar } from '../components/LoggedInBar';

export const CombinationPage = (props) => {
  const today = new Date()
  today.setHours(12,0,0);
  today.setDate(today.getDate() + 1)
  
  const tomorrow = new Date()
  tomorrow.setDate(today.getDate()+1)

  const [startDate2, setStartDate2] = useState(today);
  const [endDate2, setEndDate2] = useState(tomorrow);

  return (
    <div>
      <LoggedInBar/>
      <Combinations 
      setStartDate2={setStartDate2.bind(this)}
      setEndDate2={setEndDate2.bind(this)}
      startDate2={startDate2}
      endDate2={endDate2}/>
    </div>
  );
  
}