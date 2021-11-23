import React, {useState} from 'react';

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
    return (
        <>
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
            <NavBtnLink to='/'>LogOut</NavBtnLink>
            </NavBtn>
        </Nav>
        </>
    );
};

