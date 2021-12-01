import React, {usestate, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

export const LoggedOut = (props) => {

    const navigate = useNavigate();

    useEffect(() => {
        navigate("/")
    }, [])


    return (
        <div>
            <button>HELP</button>
        </div>
    )
}