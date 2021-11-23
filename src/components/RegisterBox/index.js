import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {
    Container,
    Body,
    Button,
    Form,
    Input,
    Div,
    Label
  } from './RegisterElement';
  
export const RegisterBox = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
  
    const navigate = useNavigate();
    const handleEmailChange = (event) => {
        const { value, name } = event.target;
        setEmail(value);
    }
    const handlePasswordChange = (event) => {
        const { value, name } = event.target;
        setPassword(value);
    }

    const onSubmit = (event) => {
        event.preventDefault();

        const object = {email: email, password: password};

        fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify(object),
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
          <h1>Register Form</h1>
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

