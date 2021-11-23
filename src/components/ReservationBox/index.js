import React, {useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';

export const ReservationBox = (props) => {
    const {id, dateT} = useParams();
    const [userData, setUserData] = useState('')
    setUserData.bind(this)

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const response = await fetch('/getdata',{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({test: 1})
          });
        const jsonResponse = await response.json()
        console.log("in")
        setUserData(jsonResponse)
    }

    const print = () => {
        console.log(userData)
    }
    
    return (
        <div>
            Use this id to generate a page with some use info and id before proceed to payment page
            <hr/>
            <p>{id}</p>
            <p>{dateT}</p>
            <button onClick={print}>Button</button>
        </div>
    )
}