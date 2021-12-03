import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
    position: absolute;
    top: 50%;
    display: flex;
    flex-direction: column;
    left: 0%;
    justify-content: center;
    self-align: center;
    border: solid 2px black;
    background-color: white;
    width: 100%;
    border-radius: 5px;
    text-align: center;
    -webkit-transform: scale(.9, .9);
    -webkit-transition: all .18s ease-in-out;
`;

export const FlexBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    self-align: center;
`

export const TextTitle = styled.label`

    font-weight: bold;
    font-size: 1.5rem;
    margin: 0.5rem;
`
export const Text = styled.label`
    font-weight: bold;
    font-size: 1rem;
    margin: 0.5rem;
`

export const FlexWrap = styled.div`

    display: flex;
    justify-content: space-around;
`

export const Button = styled.button`
    margin-right: 2rem;
`

export const SubmitButton = styled.button`
    background-color:  #009999;
    border-radius: 5px;
    border: 4px #cccccc;
    color: #eeeeee;
    text-align: center;
    font-weight: bold;
    width: 30%;
    height: 1.5rem;
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    -o-transition: all 0.5s;
    transition: all 0.5s;
    cursor: pointer;
    &:hover {
    transition: all 0.2s ease-in-out;
    background:  #00cccc;
  }
`

export const FlexRegister = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    self-align: center;
`

export const RegisterButton = styled.button`
    background-color:  #009999;
    border-radius: 5px;
    border: 4px #cccccc;
    padding: 4px;
    color: #eeeeee;
    font-weight: bold;&:hover {
    transition: all 0.2s ease-in-out;
    background:  #00cccc;
    }
`;