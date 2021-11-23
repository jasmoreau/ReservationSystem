import React from 'react';
import {BasicTable}  from './BasicTable';

export const Display = (props) => {

    return(
    <>
    <div>
        {props.cannotSeat && <p cannotSeat>We apologize, but we cannot seat you for this time!</p>}
        {props.showMessage && !props.cannotSeat && (<BasicTable data={props.data} dateT={props.dateT}></BasicTable>)}
    </div>
    </>
    )
    
}
