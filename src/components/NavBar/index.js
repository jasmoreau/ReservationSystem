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


const Navbar = () => {
return (
	<>
	<Nav>
		<Bars />
		<NavMenu>
        <NavLink to='/' activeStyle>
			<Logo  src={LogoImg}/>
		</NavLink>
		<NavLink to='/register' activeStyle>
			Sign Up
		</NavLink>
		</NavMenu>
		<NavBtn>
		<NavBtnLink to='/login'>Sign In</NavBtnLink>
		</NavBtn>
	</Nav>
	</>
);
};

export default Navbar;
