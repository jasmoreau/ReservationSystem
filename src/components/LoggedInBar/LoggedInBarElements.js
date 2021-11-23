
import { FaBars } from 'react-icons/fa';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';
 
export const Logo = styled.img`
  width:7%;
  height:auto;
`;

export const Nav = styled.nav`
  background: #fafafa;
  height: 7%;
  display: flex;
  
  justify-content: space-between;
  padding: 0.2rem calc((100vw - 1000px) / 2);
  z-index: 12;
  /* Third Nav */
  /* justify-content: flex-start; */
`;
  
export const NavLink = styled(Link)`
  color: #000000;
  display: flex;
  font-size:80%;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  text-align: center;
  height: 100%;
  cursor: pointer;
  &.hover {
    color: #0f0f0f;
  }
`;
  
export const Bars = styled(FaBars)`
  display: none;
  color: #808080;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;
  
export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;
  /* Second Nav */
  /* margin-right: 24px; */
  /* Third Nav */
  /* width: 100vw;
  white-space: nowrap; */
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
  
export const NavBtn = styled.nav`
  display: flex;
  align-items: center;

  text-align: center;
  margin-right: 24px;
  /* Third Nav */
  /* justify-content: flex-end;
  width: 100vw; */
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
  
export const NavBtnLink = styled(Link)`
  border-radius: 3px;
  background: #009999;
  padding: 8px 20px;
  color: #ffffff;
  font-size: 80%;
  outline: none;
  border: none;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  /* Second Nav */
  margin-left: 20px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background:  #00cccc;
  }
`;