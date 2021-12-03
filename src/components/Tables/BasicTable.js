import React, {useState} from 'react'
import {
    Container,
    Item,
    Button,
    Wrap    
} from './DisplayElement';

export const BasicTable = (props) => {

    const deleteTable = async(event) => {
        const id = event.id
        fetch('/deletetable',{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({id: id})
          });
        
        var data = props.data
        data = data.filter(function(item) {
            return item.id !== id
        })
        props.setData(data)
    }


    props.data.sort((a, b) => a.id > b.id ? 1 : -1);

    return(
        <>
          <Container>
            {   
                props.data.map((item, i) => 
                    <Wrap>
                    <Item >
                        Table ID: {item.id}
                    </Item>
                    <Item >
                        Max Size: {item.max_size}
                    </Item>
                    <Button key={i} id={item.id}onClick={(event) => {event.preventDefault(); deleteTable({id:item.id})}}>
                        Delete
                    </Button>
                    </Wrap>
                )
                
            }
        </Container>
        </>
    )
    
}

