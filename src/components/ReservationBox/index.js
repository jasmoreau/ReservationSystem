import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
export const ReservationBox = (props) => {
    const {id, dateT} = useParams();
    return (
        <div>
            Use this id to generate a page with some use info and id before proceed to payment page
            <hr/>
            <p>{id}</p>
            <p>{dateT}</p>
        </div>
    )
}