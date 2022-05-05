import { useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import { Alert, Container } from 'react-bootstrap';

import FormContainer from '../widgets/custom-forms/FormContainer';
import FormInput from '../widgets/custom-forms/FormInput';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [authenticated, setAuthenticated] = useState();
  const [alertShow, setAlertShow] = useState(false);

  const logDetails = (event) => {
    event.preventDefault();

    const details = {
      email,
      password,
      passwordConfirm,
    };

    console.log(details);
  };

  useEffect(() => {
    const heyCookie = Cookies.get('hey');

    heyCookie ? setAuthenticated(true) : setAuthenticated(false);
  }, []);

  useEffect(() => {
    authenticated ? setAlertShow(false) : setAlertShow(true);
  }, [authenticated]);

  return (
    <Container className='mt-3'>
      {alertShow && !authenticated && (
        <Alert variant='danger' onClose={() => setAlertShow(false)} dismissible>
          <Alert.Heading>
            It looks like you don&apos;t have an account yet!
          </Alert.Heading>
          <p>Try signing up for one to view the home page!</p>
        </Alert>
      )}

      <h1>Sign Up</h1>
      <FormContainer onSubmit={(e) => logDetails(e)} buttonText='Sign Up!'>
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
        <FormInput
          id='passwordConfirm'
          label='Password confirm'
          placeholder='Confirm your password!'
          onChange={(e) => setPasswordConfirm(e.target.value)}
          value={passwordConfirm}
          type='password'
          formGroupClass='mt-3'
        />
      </FormContainer>
    </Container>
  );
};

export default SignUp;
