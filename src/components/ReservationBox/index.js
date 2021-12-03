import React, {useState, useEffect } from 'react';
import { Container, FlexBox, Text, TextTitle, FlexWrap, Button, SubmitButton, FlexRegister, RegisterButton, Input } from './ReservationBoxElements';
import { NavBtn, NavBtnLink } from '../NavBar/NavBarElements'
import { Payment } from '../Payment';
import {Link, useNavigate} from 'react-router-dom';
import { RegisterBox } from '../RegisterBox';


export const ReservationBox = (props) => {
    const [userEmail, setUserEmail] = useState(props.userData[0].email)
    const [userFirstName, setUserFirstName] = useState(props.userData[0].first_name)
    const [userLastName, setUserLastName] = useState(props.userData[0].last_name)
    const [phoneNumber, setPhoneNumber] = useState(props.userData[0].phone)
    const [payment, setPayment] = useState(false)
    const [outsideSubmit, setOutsideSubmit] = useState(false)
    const navigate = useNavigate();

    setUserEmail.bind(this)
    setUserFirstName.bind(this)
    setUserLastName.bind(this)
    setPhoneNumber.bind(this)

    function timeout(delay) {
        return new Promise( res => setTimeout(res, delay) );
    }
    
    useEffect(() => {
        if (outsideSubmit) {
            createReservationNonEvent()
        }
      })

    const createReservationNonEvent = async() => {
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

        if(tables.length > 1){
            const response = await fetch('/addcombination',{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({tables:props.id, datetime:props.date})
                });
        }
        await timeout(5000)
        window.location.reload()
    }

    const createReservation = async(e) => {
        e.preventDefault()
        if(props.highTraffic)
            return sendToStripe()
        
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

        if(tables.length > 1){
            const response = await fetch('/addcombination',{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({tables:props.id, datetime:props.date})
              });
        }
        await timeout(5000)
        window.location.reload()
    }

    const sendToStripe = async(event) => {
        setPayment(true)
    }

    const test = () => {
        props.setReservationPlaced(true)
    }

    return(
        <Container>
              <TextTitle>Confirm Reservation</TextTitle>
         
            <form id="reservationForm" onSubmit={(event) => createReservation(event)}>
            <FlexWrap >
             <div>
            <FlexBox>
            <Text>Table Number: {props.id}</Text>
            <Text>Table Size: {props.max_size}</Text>
            <Text>Date: {props.date}</Text>
            </FlexBox>
            {!props.reservationPlaced && <Button onClick={()=>props.cancel(false)}>Cancel</Button>}
            {!props.reservationPlaced && props.highTraffic && <SubmitButton type="submit">Submit</SubmitButton>}
            {!props.reservationPlaced && !props.highTraffic && <SubmitButton type="submit">Submit</SubmitButton>}
            {props.reservationPlaced && <p>Reservation has successfully been placed!</p>}
                       </div>            
          
            <br />
         
            <FlexBox>
                <Text>
                First Name: 
                <Input type="text" value={userFirstName} onChange={async (event) => {setUserFirstName(event.target.value)}} required />
                </Text>
                <Text>
                Last Name: 
                <Input type="text" value={userLastName} onChange={async (event) => {setUserLastName(event.target.value)}} required />
                </Text>
                <Text>
                Phone: 
                <Input type="number" value={phoneNumber} onChange={async (event) => {setPhoneNumber(event.target.value)}} required />
                </Text>
                <Text>
                Email: 
                <Input type="text" value={userEmail} onChange={async (event) => {setUserEmail(event.target.value)}} required />
                </Text>
            </FlexBox>
            
            </FlexWrap>

            </form>
           

             {props.userData[0].email == "" && 
                (
                <FlexRegister>
                <label>
                    You might want to
                </label>
                <div>
                <RegisterButton>
                    <Link to="/register">
                        Register
                    </Link>
                </RegisterButton>
                </div>
                <label>
                to earn points and pre-fill your information!
                </label>
                </FlexRegister>)
                }
                
            {props.highTraffic && 
                <Text>
                You will be required to enter valid payment details to make this reservation as this is a high traffic day / holiday ({props.highTraffic}) which has a $10 no show fee!
                </Text>}

            {payment && <Payment outsideSubmit={outsideSubmit} setOutsideSubmit={setOutsideSubmit.bind(this)}></Payment>}
        
            
        </Container>
    )
}