import styled from 'styled-components';

export const SubmitButton = styled.button`
    background-color:  #009999;
    border-radius: 5px;
    margin: 1rem;
    border: 4px #cccccc;
    color: #eeeeee;
    padding: 5px;
    text-align: center;
    font-weight: bold;
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