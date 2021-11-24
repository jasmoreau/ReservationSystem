import React, {useState, useEffect } from 'react';
import { Container } from './ReservationBoxElements';


export const ReservationBox = (props) => {
    const [userEmail, setUserEmail] = useState()
    const [userFirstName, setUserFirstName] = useState()
    const [userLastName, setUserLastName] = useState()
    const [phoneNumber, setPhoneNumber] = useState()
    
    setUserEmail.bind(this)
    setUserFirstName.bind(this)
    setUserLastName.bind(this)
    setPhoneNumber.bind(this)

    return(
        <Container>
            <label>Confirm Reservation</label>
            <br />
            <label>
            First Name:
            <input type="text" value={userFirstName} onChange={async (event) => {setUserFirstName(event.target.value)}} />
            </label>
            <label>
            Last Name:
            <input type="text" value={userLastName} onChange={async (event) => {setUserLastName(event.target.value)}} />
            </label>
            <label>
            Phone:
            <input type="text" value={phoneNumber} onChange={async (event) => {setPhoneNumber(event.target.value)}} />
            </label>
            <label>
            Email:
            <input type="text" value={userEmail} onChange={async (event) => {setUserEmail(event.target.value)}} />
            </label>
            <br/>
            <label>Table Number: </label>
            <br/>
            <label>{props.id}</label>
            <br/>
            <label>Table Size: </label>
            <br />
            <label>{props.max_size}</label>
            <br />
            <label>Date: </label>
            <br />
            <label>{props.date}</label>
            <button onClick={()=>props.cancel(false)}>Cancel</button>
        </Container>
    )
}