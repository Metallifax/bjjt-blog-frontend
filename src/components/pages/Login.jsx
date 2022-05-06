import { useState } from 'react';

import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import FormContainer from '../widgets/custom-forms/FormContainer';
import FormInput from '../widgets/custom-forms/FormInput';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const logDetails = (event) => {
    event.preventDefault();

    const details = {
      email,
      password,
    };

    console.log(details);
  };

  return (
    <Container className='mt-3'>
      <h1>Login</h1>
      <FormContainer onSubmit={(e) => logDetails(e)} buttonText='Login'>
        <FormInput
          id='email'
          label='Email'
          placeholder='Enter your email!'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          formGroupClass='mt-3'
        />
        <FormInput
          id='password'
          label='Password'
          placeholder='Enter your password!'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type='password'
          formGroupClass='mt-3'
        />
      </FormContainer>
      <p className='mt-3'>
        Don&apos;t have an account? <Link to='/signup'>Click here</Link> to sign
        up!
      </p>
    </Container>
  );
};

export default Login;
