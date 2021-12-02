import React, {useState} from 'react'
import {
    Container,
    Item,
    Button,
    Wrap    
} from './DisplayElement';

export const BasicTable = (props) => {

    props.data.sort((a, b) => a.tables > b.tables ? 1 : -1);

    return(
        <>
          <Container>
            {   
                props.data.map((item, i) => 
                    <Wrap>
                    <Item >
                        Number: {item.tables}
                    </Item>
                    <Item >
                        Time: {item.datetime.substring(11, item.datetime.length-5)}
                    </Item>
                    </Wrap>
                )
                
            }
        </Container>
        </>
    )
    
}

