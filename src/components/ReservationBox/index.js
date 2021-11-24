import React, {useState, useEffect } from 'react';
import { Container } from './ReservationBoxElements';


export const ReservationBox = (props) => {
    console.log(props);
    return(
        <Container>
            <label>Confirm Reservation</label>
            <br />
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