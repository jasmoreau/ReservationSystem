import React from 'react';
import { Text } from '../ReservationBox/ReservationBoxElements';
import {BasicTable}  from './BasicTable';

export const Display = (props) => {

    return(
    <>
    <div>
        {props.highTraffic && <><Text>WARNING: This is a high traffic day / holiday ({props.highTraffic}) which has a $10 no show fee!</Text><br/></>}
        {props.cannotSeat && <p cannotSeat>We apologize, but we cannot seat you for this time!</p>}
        {props.showMessage && !props.cannotSeat && (<BasicTable data={props.data} dateT={props.dateT} userData={props.userData} highTraffic={props.highTraffic} reservationPlaced={props.reservationPlaced} setReservationPlaced={props.setReservationPlaced}></BasicTable>)}
    </div>
    </>
    )
    
}
