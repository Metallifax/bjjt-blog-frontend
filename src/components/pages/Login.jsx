import { useEffect, useState } from 'react';

import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import api from '../../api';
import { useDebounce } from '../../utils';
import FormContainer from '../widgets/custom-forms/FormContainer';
import FormInput from '../widgets/custom-forms/FormInput';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [responseErrors, setResponseErrors] = useState([]);
  const debouncedResponseErrors = useDebounce(responseErrors, 500);

  useEffect(() => {
    if (debouncedResponseErrors) {
      console.log(debouncedResponseErrors);
    }
  }, [debouncedResponseErrors]);

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

  const submitLogin = async (e) => {
    e.preventDefault();

    const newErrors = findFormErrors();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const details = {
        email: form.email,
        password: form.password,
      };

      await api
        .post('/api/auth/login', details)
        .then((res) => {
          console.log(res.data);
        })
        .catch(({ response: { data } }) => {
          if ('error' in data) {
            setResponseErrors([{ param: data.param, msg: data.error }]);
          } else {
            let m = data.errors.map((errorMap) => ({
              param: errorMap.param,
              msg: errorMap.msg,
            }));
            setResponseErrors([...m]);
          }
        });
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
