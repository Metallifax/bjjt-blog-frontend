import { useState } from 'react';

import Cookies from 'js-cookie';
import { Container } from 'react-bootstrap';

import FormContainer from '../widgets/custom-forms/FormContainer';
import FormInput from '../widgets/custom-forms/FormInput';

const Admin = () => {
  const [cookieKey, setCookieKey] = useState('');
  const [cookieValue, setCookieValue] = useState('');

  const cookieCreate = (e) => {
    e.preventDefault();

    if (cookieKey && cookieValue) {
      Cookies.set(cookieKey, cookieValue);
      setCookieKey('');
      setCookieValue('');
    } else {
      console.error('Either cookieKey or cookieValue is falsy');
    }
  };

  return (
    <Container className='mt-3'>
      <h2 className='mt-5'>Generate Cookie</h2>
      <FormContainer
        onSubmit={(e) => cookieCreate(e)}
        buttonText='Generate Cookie'
      >
        <FormInput
          id='cookieKey'
          label='Cookie Key'
          onChange={(e) => setCookieKey(e.target.value)}
          value={cookieKey}
          formGroupClass='mt-3'
        />
        <FormInput
          id='cookieValue'
          label='Cookie Value'
          onChange={(e) => setCookieValue(e.target.value)}
          value={cookieValue}
          formGroupClass='mt-3'
        />
      </FormContainer>
    </Container>
  );
};

export default Admin;
