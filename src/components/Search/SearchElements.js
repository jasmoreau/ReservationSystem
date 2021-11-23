import styled from 'styled-components';
import restaurant from './restaurant.jpg';
import DatePicker from 'react-datepicker'
import NumericInput from 'react-numeric-input';

export const Wrapper = styled.div`
  height: 25rem;
  display: flex;
  flex-direction: column;
  background: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url(${restaurant});
  -webkit-background-size: cover;
  -moz-background-size:  cover;
  -o-background-size: cover;background-size: cover;
  linear-gradient(
        rgba(0, 0, 0, 0), 
        rgba(0, 0, 0, 0)
    );
  justify-content: center;
  align-items: center;
  padding: 0.2rem calc((100vw - 1000px) / 2);
  z-index: 12;
  opacity: 0.9;
  /* Third Nav */
  /* justify-content: flex-start; */
`;

export const Word = styled.h1`
    color: #ffffff;
`;

export const FuncWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items:center;
    height: 5rem;
`;

export const DatePick = styled(DatePicker)`
    height:2rem;
    width: 95%;
    border: 1px solid black;
    border-radius: 5px;
    text-align: center;
    font-weight: bold;
    cursor: pointer;
`;

export const Form = styled.form`
    height:2.1rem;
    width: 50%;
    border: 1px solid black;
    border-radius: 5px;
    text-align: center;
    font-weight: bold;
`;

export const NumericInp = styled(NumericInput)`
    height:2.1rem;
    width: 100%;
    border: 1px solid black;
    border-radius: 5px;
    text-align: center;
    font-weight: bold;
    cursor: pointer;
`;

export const Button = styled.button`
    background-color: #ff0000;
    border-radius: 5px;
    border: 4px double #cccccc;
    color: #eeeeee;
    text-align: center;
    font-weight: bold;
    width: 30%;
    height: 2.1rem;
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    -o-transition: all 0.5s;
    transition: all 0.5s;
    cursor: pointer;
    &:hover {
    transition: all 0.2s ease-in-out;
    background: #ff8080;
  }
`;