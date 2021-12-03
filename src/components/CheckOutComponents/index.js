import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { SubmitButton } from './checkOutStyles';

export const CheckOutComponent = (props) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      redirect: 'if_required',
    });

    
    if (result.error) {
      // Show error to your customer (e.g., payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
      props.setOutsideSubmit(true)
    }
  };

  return (
    <form onSubmit={(event) => {handleSubmit(event)}}>
      <PaymentElement />
      <SubmitButton disabled={!stripe}>Submit</SubmitButton>
    </form>
  )
};