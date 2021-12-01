import React, {useState} from 'react';
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
    
export const LoggedInBar = () => {
    const navigate = useNavigate();

    const logout = async () => {
        const response = await fetch('/logout',{
            method: "POST",
            headers: { "Content-Type": "application/json" }
          });
        console.log(response)
        navigate('/loggedout');
    }
    

    return (
        
        // <div>Test</div>
        <Nav>
            <Bars />
            <NavMenu>
            <NavLink to='/'>
                <Logo  src={LogoImg}/>
            </NavLink>
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

