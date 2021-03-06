import React, { useState, useEffect } from 'react';
import { CheckOutComponent } from '../CheckOutComponents';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51K04KaHxx5tHW0hyE7vcP9CUxRRPb0vROb666ishVGjZN6k48ZQ1kP3UDqlgW0yZZdShsrybYolFcL4BKvebmAXr00115uO3xQ');
let opt;
const getKey = async () => {
    const rep = await fetch('/api/getKey',{
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
    const response = await rep.json();
    
    opt = response;
    console.log(opt)
};


const CheckOutComp = (props) => {
    
   
    const options = {
        clientSecret: opt.clientSecret,
    };
    console.log(opt.clientSecret)
    console.log(props)
    return(
        <Elements stripe={stripePromise} options={options}>
        <CheckOutComponent outsideSubmit={props.outsideSubmit} setOutsideSubmit={props.setOutsideSubmit.bind(this)}  />
        </Elements>
    )
}

export const Payment = (props) => {

    const [load, setLoad] = useState(false);
    useEffect(async () => {
        await getKey();
        setLoad(true)
    }, [])
    

    return (
        <>
        {load && (<CheckOutComp outsideSubmit={props.outsideSubmit} setOutsideSubmit={props.setOutsideSubmit.bind(this)} />)}
        </>
    );
};
