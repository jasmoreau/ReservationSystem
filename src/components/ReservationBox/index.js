import React, {useState, useEffect } from 'react';
import { Container } from './ReservationBoxElements';
import { NavBtn, NavBtnLink } from '../../../src/components/NavBar/NavBarElements'

import {useNavigate} from 'react-router-dom';


export const ReservationBox = (props) => {
    const [userEmail, setUserEmail] = useState(props.userData[0].email)
    const [userFirstName, setUserFirstName] = useState(props.userData[0].first_name)
    const [userLastName, setUserLastName] = useState(props.userData[0].last_name)
    const [phoneNumber, setPhoneNumber] = useState(props.userData[0].phone)
    const navigate = useNavigate();

    setUserEmail.bind(this)
    setUserFirstName.bind(this)
    setUserLastName.bind(this)
    setPhoneNumber.bind(this)

    function timeout(delay) {
        return new Promise( res => setTimeout(res, delay) );
    }
    

    const createReservation = async(e) => {
        e.preventDefault()
        props.setReservationPlaced(true)
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
        await timeout(5000)
        window.location.reload()
    }

    const sendToStripe = async(event) => {
        navigate('/checkout');
    }

    const test = () => {
        props.setReservationPlaced(true)
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
                <input type="number" value={phoneNumber} onChange={async (event) => {setPhoneNumber(event.target.value)}} required />
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
            {!props.reservationPlaced && <button onClick={()=>props.cancel(false)}>Cancel</button>}
            {!props.reservationPlaced && props.highTraffic && <button onClick={()=>sendToStripe()} type="submit">Submit</button>}
            {!props.reservationPlaced && !props.highTraffic && <button type="submit">Submit</button>}
            {props.reservationPlaced && <p>Reservation has successfully been placed!</p>}
            {props.userData[0].email == "" && 
                (<div>You might want to
                <NavBtn>
                <NavBtnLink to='/register'>Register</NavBtnLink>
                </NavBtn>
                &nbsp; &nbsp; &nbsp;to earn points and pre-fill your information!</div>)}
                
            {props.highTraffic && <p><b>You will be required to enter valid payment details to make this reservation as this is a high traffic day / holiday ({props.highTraffic}) which has a $10 no show fee!</b></p>}
            </form>
        </Container>
    )
}