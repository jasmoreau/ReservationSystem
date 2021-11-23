import React, { useState } from 'react';
import {
  Container,
  Body,
  Button,
  Form,
  Input,
  Div,
  Label
} from './LoginElements';

import {useNavigate} from 'react-router-dom';

export const LoginBox = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
  
    const navigate = useNavigate();
    const handleEmailChange = (event) => {
        const { value } = event.target;
        setEmail(value);
    }
    const handlePasswordChange = (event) => {
        const { value } = event.target;
        setPassword(value);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        fetch('/api/authenticate', {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
            'Content-Type': 'application/json'
        }
        })
        .then(res => {
        if (res.status === 200) {
            navigate('/');
        } else {
            const error = new Error(res.error);
            throw error;
        }
        })
        .catch(err => {
        console.error(err);
        alert('Error registering please try again');
        });
    }

    const goBack = () => {
        navigate('/');
    }

  
    return (
        <Body>
        <Form onSubmit={onSubmit}>
         
          <Container>
          <Div>
          <h1>Login Form</h1>
          </Div>
          <Label>User name </Label>
          <Input
            type="email"
            name="email"
            placeholder="Enter email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <Label>Password </Label>
          <Input
            type="password"
            name="password"
            placeholder="Enter password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <Button type="submit" value="Submit">
            <Div>Submit</Div>
          </Button>      
           
          <Button type="cancel" onClick={goBack}>
            <Div>Cancel</Div>
          </Button>
    
          </Container>
        </Form>
        </Body>
    );
  
}

