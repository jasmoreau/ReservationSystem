import React, {useState, useEffect } from 'react';
import { Container } from './ReservationBoxElements';
import { NavBtn, NavBtnLink } from '../../../src/components/NavBar/NavBarElements'

export const ReservationBox = (props) => {
    const [userEmail, setUserEmail] = useState(props.userData[0].email)
    const [userFirstName, setUserFirstName] = useState(props.userData[0].first_name)
    const [userLastName, setUserLastName] = useState(props.userData[0].last_name)
    const [phoneNumber, setPhoneNumber] = useState(props.userData[0].phone)
    
    setUserEmail.bind(this)
    setUserFirstName.bind(this)
    setUserLastName.bind(this)
    setPhoneNumber.bind(this)

    const createReservation = async(event) => {
        event.preventDefault();
        const tables = props.id.toString().split(" + ")
        if(props.highTraffic) var paying = true; else var paying = false;
        for (const element of tables){
            const resData = {datetime: props.date, tableid: element, name: userFirstName + " " + userLastName, phone: phoneNumber, email: userEmail, paid: paying, dinerid: props.userData[0].userid}
        
            const response = await fetch('/makereservation',{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(resData)
              });
        }
    }

    return(
        <Container>
            <label>Confirm Reservation</label>
            <br />
            <form onSubmit={(event) => createReservation(event)}>
            <div>
                <label>
                First Name:
                <input type="text" value={userFirstName} onChange={async (event) => {setUserFirstName(event.target.value)}} required />
                </label>
                <label>
                Last Name:
                <input type="text" value={userLastName} onChange={async (event) => {setUserLastName(event.target.value)}} required />
                </label>
                <label>
                Phone:
                <input type="text" value={phoneNumber} onChange={async (event) => {setPhoneNumber(event.target.value)}} required />
                </label>
                <label>
                Email:
                <input type="text" value={userEmail} onChange={async (event) => {setUserEmail(event.target.value)}} required />
                </label>
            </div>
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
            <button type="submit">Submit</button>
            {props.userData[0].email == "" && 
                <NavBtn>
                <p>You might want to </p>
                <NavBtnLink to='/register'>Register</NavBtnLink>
                <p>&nbsp; &nbsp; &nbsp;to earn points and pre-fill your information!</p>
                </NavBtn>}
            {props.highTraffic && <p><b>You will be required to enter valid payment details to make this reservation as this is a high traffic day / holiday ({props.highTraffic}) which has a $10 no show fee!</b></p>}
            </form>
        </Container>
    )
}