import { useState } from 'react';

import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import FormContainer from '../widgets/custom-forms/FormContainer';
import FormInput from '../widgets/custom-forms/FormInput';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });

    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: null,
      });
    }
  };

  const findFormErrors = () => {
    const { email, password } = form;
    const newErrors = {};

    if (!email || email === '') newErrors.email = 'Cannot be blank';
    if (!password || password === '') newErrors.password = 'Cannot be blank';

    return newErrors;
  };

  const changeEmailHandler = (e) => {
    setField('email', e.target.value);
  };

  const changePasswordHandler = (e) => {
    setField('password', e.target.value);
  };

  const submitLogin = (e) => {
    e.preventDefault();

    const newErrors = findFormErrors();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const details = {
        email: form.email,
        password: form.password,
      };

      console.log(details);
    }
  };

  return (
    <Container className='mt-3'>
      <h1>Login</h1>
      <FormContainer onSubmit={submitLogin} buttonText='Login'>
        <FormInput
          id='email'
          label='Email'
          placeholder='Enter your email!'
          onChange={(e) => changeEmailHandler(e)}
          isInvalid={errors.email}
          errorMessage={errors.email}
          value={form.email}
          formGroupClass='mt-3'
        />
        <FormInput
          id='password'
          label='Password'
          placeholder='Enter your password!'
          onChange={(e) => changePasswordHandler(e)}
          isInvalid={errors.password}
          errorMessage={errors.password}
          value={form.password}
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
