import React from 'react';
import {
Nav,
NavLink,
Bars,
NavMenu,
NavBtn,
NavBtnLink,
Logo
} from './NavBarElements';
import LogoImg from './uh.png';


export const Navbar = () => {
    return (
        <>
        <Nav>
            <Bars />
            <NavMenu>
            <NavLink to='/'>
                <Logo  src={LogoImg}/>
            </NavLink>
            <NavLink to='/register'>
                Register
            </NavLink>
            </NavMenu>
            <NavBtn>
            <NavBtnLink to='/login'>LogIn</NavBtnLink>
            </NavBtn>
        </Nav>
        </>
    );
};

