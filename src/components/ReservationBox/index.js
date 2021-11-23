import React, {useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';

export const ReservationBox = (props) => {
    const {id, dateT} = useParams();

    const [userData, setUserData] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userBillingAddr, setUserBillingAddr] = useState('')
    const [userMailingAddr, setUserMailingAddr] = useState('')
    const [userFirstName, setUserFirstName] = useState('')
    const [userLastName, setUserLastName] = useState('')
    const [userPoints, setPoints] = useState('')
    const [userPreferredPayment, setUserPreferredPayment] = useState('')
    const [userId, setUserId] = useState('')
    setUserData.bind(this)
    setUserEmail.bind(this)
    setUserBillingAddr.bind(this)
    setUserMailingAddr.bind(this)
    setUserFirstName.bind(this)
    setUserLastName.bind(this)
    setPoints.bind(this)
    setUserPreferredPayment.bind(this)
    setUserId.bind(this)

    useEffect(() => {
        getData()
    }, [])

    const setData = async (jsonResponse) => {
        setUserData(jsonResponse)
        setUserEmail(jsonResponse.email)
        setUserBillingAddr(jsonResponse.billing_addr)
        setUserMailingAddr(jsonResponse.mailing_addr)
        setUserFirstName(jsonResponse.first_name)
        setUserLastName(jsonResponse.last_name)
        setPoints(jsonResponse.points)
        setUserPreferredPayment(jsonResponse.preferred_payment)
        setUserId(jsonResponse.userId)
    }

    const getData = async () => {
        const response = await fetch('/getData',{
            method: "POST",
            headers: { "Content-Type": "application/json" }
          });
        const jsonResponse = await response.json()
        const jsonResponse2 = JSON.parse(JSON.stringify(jsonResponse[0], function(key, value) {if(value === null)  return ''; return value;}))
        setData(jsonResponse2)
    }

    const reset = () => {
        getData()
    }

    const submit = () => {
        const idArr = id.split(" + ")
        console.log(idArr)
    }
    
    return (
        <div>
            Use this id to generate a page with some use info and id before proceed to payment page
            <hr/>
            <p>{id}</p>
            <p>{dateT}</p>
            <form>
                <label>
                Email:
                <input type="text" value={userEmail} onChange={async (event) => {setUserEmail(event.target.value)}} />
                </label>
            </form>
            <form>
                <label>
                First Name:
                <input type="text" value={userFirstName} onChange={async (event) => {setUserFirstName(event.target.value)}} />
                </label>
            </form>
            <form>
                <label>
                Last Name:
                <input type="text" value={userLastName} onChange={async (event) => {setUserLastName(event.target.value)}} />
                </label>
            </form>
            <form>
                <label>
                Billing Address:
                <input type="text" value={userBillingAddr} onChange={async (event) => {setUserBillingAddr(event.target.value)}} />
                </label>
            </form>
            <form>
                <label>
                Mailing Address:
                <input type="text" value={userMailingAddr} onChange={async (event) => {setUserMailingAddr(event.target.value)}} />
                </label>
            </form>
            <form>
                <label>
                Preferred Payment Method:
                <div>
                    <label>Cash</label>
                    <input type="radio" value="Cash" checked={userPreferredPayment == "Cash"} onChange={async (event) => {setUserPreferredPayment(event.target.value)}}/>
                    <label>Credit</label>
                    <input type="radio" value="Credit" checked={userPreferredPayment == "Credit"} onChange={async (event) => {setUserPreferredPayment(event.target.value)}}/>
                    <label>Check</label>
                    <input type="radio" value="Check" checked={userPreferredPayment == "Check"} onChange={async (event) => {setUserPreferredPayment(event.target.value)}}/>
                </div>
                </label>
            </form>
            <button onClick={reset}>Reset</button>
            <button onClick={submit}>Submit</button>
        </div>
    )
}