import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
    Logo
} from './LoggedInBarElements';
import LogoImg from './uh.png';
    
export const LoggedInBar = (props) => {
    const navigate = useNavigate();

    const [isOwner, setIsOwner] = useState(false);

    const logout = async () => {
        const response = await fetch('/logout',{
            method: "POST",
            headers: { "Content-Type": "application/json" }
          });
        console.log(response)
        navigate('/loggedout');
    }

    const ownerCheck = async () => {
        const response = await fetch('/checkowner',{
            method: "POST",
            headers: { "Content-Type": "application/json" }
          });
        const jsonResponse = await response.json();
        if(jsonResponse == 1)
          setIsOwner(true)
        else
          setIsOwner(false)
      };

    useEffect(async () => {
    await ownerCheck();
    }, []);


    return (
        
        // <div>Test</div>
        <Nav>
            <Bars />
            <NavMenu>
            <NavLink to='/'>
                <Logo  src={LogoImg}/>
            </NavLink>
            {isOwner == 1 && <NavLink to='/combinations'>
                Check All Combinations
            </NavLink>}
            {isOwner == 1 && <NavLink to='/tables'>
                Edit Tables
            </NavLink>}
            <NavLink to='/aboutme'>
                Profile
            </NavLink>
            </NavMenu>
            <NavBtn>
            <NavBtnLink to='/' onClick={() => {logout()}}>LogOut</NavBtnLink>
            </NavBtn>
        </Nav>
        
    );
};

