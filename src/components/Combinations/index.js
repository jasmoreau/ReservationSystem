import React, {useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker'
import dateFormat from "dateformat";
import {BasicTable}  from './BasicTable';

export const Combinations = (props) => {

    const [data, setData] = useState([]);

    const getCombinations = async () => {
        const startDate = dateFormat(props.startDate2, "yyyy-mm-dd")
        const endDate = dateFormat(props.endDate2, "yyyy-mm-dd")
        console.log(startDate)
        console.log(endDate)
        const response = await fetch('/getcombination',{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({startDate:startDate, endDate:endDate})
          });
        const jsonResponse = await response.json()
        setData(jsonResponse)
    }

    const toggleButtonState = async () => {
        try{
          getCombinations()
        }
        catch(err){
          console.log(err.message);
        }
      };


    return (
        <>
        <div>
        <DatePicker
            selected={props.startDate2} 
            onChange={(date) => props.setStartDate2(date)}
            dateFormat="MMMM d, yyyy"
            />
        <button onClick={toggleButtonState}>Find Combinations</button>
        <BasicTable data={data}></BasicTable>
        </div>
        </>
    )

}