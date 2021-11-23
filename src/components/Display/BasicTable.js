import React, {useState} from 'react'
import {
    Container,
    Item,
    Button,
    Wrap
    
} from './DisplayElement';

import {useNavigate} from 'react-router-dom';

export const BasicTable = (props) => {

    props.data.sort((a, b) => a.max_size > b.max_size ? 1 : -1);
    
    const navigate = useNavigate();
    const reservePage = (event) => {
        console.log(event)
        event.preventDefault();
        const {value} = event.target;
        navigate(`/reserve/${value}+${props.dateT}`);
    }

    return(
        <Container>
            {   
                props.data.map((item, i) => 
                    <Wrap>
                    <Item>
                        Number: {item.id}
                    </Item>
                    <Item>
                        Size: {item.max_size}
                    </Item>
                    <Button value={item.id} onClick={reservePage}>
                        Reserve
                    </Button>
                    </Wrap>
                )
                
            }
        </Container>
    )
    
}

