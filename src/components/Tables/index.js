import React, {useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import {BasicTable}  from './BasicTable';

export const Tables = (props) => {
    const [data, setData] = useState([]);
    const [tableID, setTableID] = useState()
    const [maxSize, setMaxSize] = useState()

    const getTables = async () => {
        const response = await fetch('/gettables',{
            method: "POST",
            headers: { "Content-Type": "application/json" },
          });
        const jsonResponse = await response.json()
        console.log(jsonResponse)
        setData(jsonResponse)
    }

    const addTable = async (e) => {
      e.preventDefault();
      fetch('/addtable',{
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({id: tableID, max_size:maxSize})
        });
      await getTables();
  }

    useEffect(async () => {
      await getTables();
    },[])

    return (
        <>
        <div>
          <form onSubmit={(event) => {addTable(event)}}>
            <label>
            Table ID:
            <input type="number" onChange={async (event) => {setTableID(event.target.value)}} required />
            </label>
            <label>
            Max Size:
            <input type="number" onChange={async (event) => {setMaxSize(event.target.value)}} required/>
            </label>
            <br />
            <button type="submit">Add Table</button>
          </form>
          <BasicTable data={data} setData={setData.bind(this)}></BasicTable>
        </div>
        </>
    )

}