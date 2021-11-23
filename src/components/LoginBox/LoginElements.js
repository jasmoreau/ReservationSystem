import styled from 'styled-components';

export const Container = styled.div`
    margin-top: 50px;
    padding: 0px 25px;   
    border-radius: 10px;
    border: solid 2px;
    display: flex;
    flex-direction: column;
    width :100%;
    height:100%;
    background-color: #fafafa;
    -webkit-box-shadow: 6px 11px 23px 1px rgba(0,0,0,0.75);
    -moz-box-shadow: 6px 11px 23px 1px rgba(0,0,0,0.75);
    box-shadow: 6px 11px 23px 1px rgba(0,0,0,0.75);
`;

export const Label = styled.label`
    font-weight: bold;
`;

export const Div = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
    font-weight: bold;
`;

export const Body = styled.div`  
    font-family: Calibri, Helvetica, sans-serif;  
    position:fixed;
    padding:0;
    margin:0;
    top:0;
    left:0;
    display: flex;
    align-text:center;
    flex-direction: column;
    align-items: center;
    align-content: center;
    width:100%;
    height: 100%;
    background: rgb(238,108,72);
    background: linear-gradient(0deg, rgba(238,108,72,0.3561799719887955) 15%, rgba(224,130,15,0.7371323529411764) 76%);
`;

export const Button = styled.button`  
    background: rgba(238,108,72,0.3561799719887955);
    width: 100%;
    border-radius: 5px; 
    border: 2px solid; 
    padding: 15px;   
    margin: 10px 0px;   
    border: none;   
    cursor: pointer;   
    text-align: center;
    &:hover{
        opacity: 0.7;
    }
`;
export const Form = styled.form`
`;

export const Input = styled.input`   
    margin: 8px 0;  
    padding: 12px 20px;   
    border-radius: 10px;
    display: inline-block;   
    border: 2px solid;   
    box-sizing: border-box;   
    &:focus{
        outline: none;
        transform: scale(1.05);
    }
`;
