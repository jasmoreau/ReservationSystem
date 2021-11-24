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
    const [max_size, setMaxSize] = useState(0);

    props.data.sort((a, b) => a.max_size > b.max_size ? 1 : -1);
    
    const navigate = useNavigate();
    const reservePage = (event) => {
        console.log(event)
        event.preventDefault();
        const {id, size} = event.target;
        setId(id);
        setMaxSize(size);
        console.log(id);
        console.log(size);
        setConfirmReserve(true);
        
    }

    return(
        <>
        {confirmReserve && <ReservationBox id={id} max_size={max_size} date={props.dateT} cancel={setConfirmReserve.bind(this)}/>}
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
                    <Button key={i} id={item.id} size={item.max_size} onClick={reservePage}>
                        Reserve
                    </Button>
                    </Wrap>
                )
                
            }
        </Container>
        </>
    )
    
}

