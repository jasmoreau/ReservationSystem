import React, {useState} from 'react'
import {
    Container,
    Item,
    Button,
    Wrap    
} from './DisplayElement';

import {useNavigate} from 'react-router-dom';
import { ReservationBox } from '../ReservationBox';

export const BasicTable = (props) => {

    const [confirmReserve, setConfirmReserve] = useState(false);
    const [id, setId] = useState();
    const [max_size, setMaxSize] = useState("");

    props.data.sort((a, b) => a.max_size > b.max_size ? 1 : -1);
    
    const navigate = useNavigate();
    const reservePage = (event) => {
        setId(event.id);
        setMaxSize(event.max_size);;
        setConfirmReserve(true);
    }

    return(
        <>
        {confirmReserve && <ReservationBox id={id} max_size={max_size} date={props.dateT} userData={props.userData} highTraffic={props.highTraffic} cancel={setConfirmReserve.bind(this)} reservationPlaced={props.reservationPlaced} setReservationPlaced={props.setReservationPlaced}/>}
        <Container>
            {   
                props.data.map((item, i) => 
                    <Wrap>
                    <Item >
                        Number: {item.id}
                    </Item>
                    <Item >
                        Size: {item.max_size}
                    </Item>
                    <Button key={i} id={item.id} max_size={item.max_size} onClick={(event) => {event.preventDefault(); reservePage({id:item.id, max_size:item.max_size})}}>
                        Reserve
                    </Button>
                    </Wrap>
                )
                
            }
        </Container>
        </>
    )
    
}

