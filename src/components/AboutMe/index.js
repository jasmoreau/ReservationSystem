import React, {useState, useEffect } from 'react';

export const AboutMeBox = (props) => {
    const [userData, setUserData] = useState()
    const [userEmail, setUserEmail] = useState()
    const [userBillingAddr, setUserBillingAddr] = useState()
    const [userMailingAddr, setUserMailingAddr] = useState()
    const [userFirstName, setUserFirstName] = useState()
    const [userLastName, setUserLastName] = useState()
    const [userPoints, setPoints] = useState()
    const [userPreferredPayment, setUserPreferredPayment] = useState()
    const [userId, setUserId] = useState()
    const [phoneNumber, setPhoneNumber] = useState()
    
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
        setUserId(jsonResponse.userid)
        setPhoneNumber(jsonResponse.phone)
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

    const updateData = () => {
        return {
            userid: userId,
            email: userEmail,
            first_name: userFirstName,
            last_name: userLastName,
            mailing_addr: userMailingAddr,
            billing_addr: userBillingAddr,
            points: userPoints,
            preferred_payment: userPreferredPayment,
            phone: phoneNumber
        }
    }


    const submit = async (event) => {
        event.preventDefault();
        const data = updateData;
        await fetch('/updateData',{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
          })
        .then(res => {
        if (res.status === 200) {
            alert('Update succesful');
        } else {
            const error = new Error(res.error);
            throw error;
        }
        })
        .catch(err => {
        console.error(err);
        alert('Error saving change please try again');
        });
    }

    return (
        <>
        <div>
            <h1> About Me </h1>
            <label>
                Diner Number: {userId}
            </label>
            <form onSubmit={submit}>
                <label>
                Email:
                <input type="text" value={userEmail} onChange={async (event) => {setUserEmail(event.target.value)}} />
                </label>
                <br />
                <label>
                First Name:
                <input type="text" value={userFirstName} onChange={async (event) => {setUserFirstName(event.target.value)}} required/>
                </label>
                <br />
                <label>
                Last Name:
                <input type="text" value={userLastName} onChange={async (event) => {setUserLastName(event.target.value)}} />
                </label>
                <br />
                <label>
                Billing Address:
                <input type="text" value={userBillingAddr} onChange={async (event) => {setUserBillingAddr(event.target.value)}} />
                </label>
                <br />
                <label>
                Mailing Address:
                <input type="text" value={userMailingAddr} onChange={async (event) => {setUserMailingAddr(event.target.value)}} />
                </label>
                <br />
                <label>
                Phone Number:
                <input type="text" value={phoneNumber} onChange={async (event) => {setPhoneNumber(event.target.value)}} />
                </label>
                <br />
                <label>
                Points:
                <input type="text" value={userPoints}  onChange={async (event) => {setPoints(event.target.value)}} />
                </label>
                <br />
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
                <br />
                <button onClick={reset}>Reset</button>
                <button type="submit">Save Changes</button>
            </form>
        </div>
        </>
    )

}