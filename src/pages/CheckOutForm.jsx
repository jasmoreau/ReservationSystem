import React, { useState, useEffect } from 'react';
import {CheckOutComponent} from '../components/CheckOutComponents';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jxpk_test_51I6sYMAOWgiadKFpuesmhGeqsXOup9Y3hCVln7mb7eON2EnhuhBTzZMYzVHhu3psh0o9CCf9zgYqlCVbuPnOlevk00IaWEiKQa');
let opt;
const getKey = async () => {
    const rep = await fetch('/api/getKey',{
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
    const response = await rep.json();
    
    opt = response;
    
};


const CheckOutComp = (props) => {
    
   
    const options = {
        clientSecret: opt.clientSecret.toString(),
    };

    return(
        <Elements stripe={stripePromise} options={options}>
        <CheckOutComponent />
        </Elements>
    )
}

export const CheckOutForm = (props) => {

    const [load, setLoad] = useState(false);
    useEffect(async () => {
        await getKey();
        setLoad(true)
    }, [])
    

    return (
        <>
        {load && (<CheckOutComp/>)}
        </>
    );
};
