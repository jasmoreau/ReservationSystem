import styled from 'styled-components';
import { ReservationBox } from '../ReservationBox';

export const ReservationBoxx = styled(ReservationBox)`
  display: block;
  position: fixed;
  bottom: 0;
  right: 15px;
  border: 3px solid #f1f1f1;
  z-index: 9;
`;


export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    
   `;

export const Item = styled.div`
    font-weight: bold;
`;

export const Button = styled.button`
    background: rgba(238,108,72,0.3561799719887955);
    padding: 5px;
    border-radius: 5px; 
    border: 2px solid; 
    border: none;   
    cursor: pointer;   
    &:hover{
        opacity: 0.7;
    }
    font-weight: bold;
`;

export const Label = styled.h1`
`;

export const Wrap = styled.div`
    display: flex;
    justify-content: space-around;
    border: 2px solid;
    width: 80%;
    margin: 10px;
    padding: 5px;
    border-radius: 5px;
    -webkit-box-shadow: 7px 13px 8px -1px rgba(0,0,0,0.75);
    -moz-box-shadow: 7px 13px 8px -1px rgba(0,0,0,0.75);
    box-shadow: 7px 13px 8px -1px rgba(0,0,0,0.75);
    background: rgb(253,29,29);
    background: linear-gradient(90deg, rgba(253,29,29,0.41220238095238093) 0%, rgba(252,176,69,0.45702030812324934) 87%);`;