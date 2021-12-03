import React, {useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker'
import dateFormat from "dateformat";
import {BasicTable}  from './BasicTable';

export const Combinations = (props) => {

    const [data, setData] = useState([]);
    const [reservationsExist, setReservationsExist] = useState(false);

    const getCombinations = async () => {
        var startDate = dateFormat(props.startDate2, "yyyy-mm-dd h:MM:ss")
        var endDate = dateFormat(props.endDate2, "yyyy-mm-dd h:MM:ss")
        startDate = startDate.substring(0, 10) + " 00:00:00"
        endDate = startDate.substring(0, 10) + " 23:59:59"
        console.log(startDate)
        console.log(endDate)
        const response = await fetch('/getcombination',{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({startDate:startDate, endDate:endDate})
          });
        const jsonResponse = await response.json()
        setData(jsonResponse)
        if(jsonResponse.length == 0)
          setReservationsExist(false)
        else
          setReservationsExist(true)
    }

    const toggleButtonState = async () => {
        try{
          getCombinations()
        }
        catch(err){
          console.log(err.message);
        }
      };

    useEffect(async () => {
      await getCombinations();
    }, [])

    return (
        <>
        <div>
        <DatePicker
            selected={props.startDate2} 
            onChange={(date) => props.setStartDate2(date)}
            dateFormat="MMMM d, yyyy"
            />
        <button onClick={toggleButtonState}>Find Combinations</button>
        {reservationsExist && <BasicTable data={data}></BasicTable>}
        {!reservationsExist && <p>There are no combinations needed this day!</p>}
        </div>
        </>
    )

}