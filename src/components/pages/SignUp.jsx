import { useState } from 'react';

import Cookies from 'js-cookie';
import { Alert, Container, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import api from '../../api';
import { setIsLoggedIn } from '../../features/user/userSlice';
import FormContainer from '../widgets/custom-forms/FormContainer';
import FormInput from '../widgets/custom-forms/FormInput';

const SignUp = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const [errors, setErrors] = useState({});
  const [responseErrors, setResponseErrors] = useState([]);
  const [alertShow, setAlertShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const setField = (field, value) => {
    setAlertShow(false);

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
    const { email, password, passwordConfirm } = form;
    const newErrors = {};

    if (!email || email === '') newErrors.email = 'Cannot be blank';
    if (!password || password === '') newErrors.password = 'Cannot be blank';
    if (!passwordConfirm || passwordConfirm === '')
      newErrors.passwordConfirm = 'Cannot be blank';
    if (password !== passwordConfirm)
      newErrors.passwordConfirm = 'Passwords must match';

    return newErrors;
  };

  const signUpSubmit = async (e) => {
    e.preventDefault();

    const newErrors = findFormErrors();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const details = {
        email: form.email,
        password: form.password,
        passwordConfirm: form.passwordConfirm,
      };

      await api
        .post('/api/auth/signup', details)
        .then((res) => {
          console.log('RESPONSE BLOCK');
          console.log(res.data);
          Cookies.set('token', res.data.token);
          dispatch(setIsLoggedIn(true));
          navigate('/');
        })
        .catch(({ response: { data } }) => {
          console.log('CATCH BLOCK');
          setResponseErrors(data);
          setAlertShow(true);
          console.log(responseErrors);
        });

      console.log(details);
    }
  };

  const changeEmailHandler = (e) => {
    setField('email', e.target.value);
  };

  const changePasswordHandler = (e) => {
    setField('password', e.target.value);
  };

  const changePasswordConfirmHandler = (e) => {
    setField('passwordConfirm', e.target.value);
  };

  return (
    <Container className='mt-3'>
      {alertShow && responseErrors.length > 0 && (
        <Alert variant='danger' onClose={() => setAlertShow(false)} dismissible>
          <Alert.Heading>Sign Up failed...</Alert.Heading>
          <p>Here&apos;s what went wrong:</p>

          <ListGroup>
            {responseErrors.map((error) => {
              return (
                <ListGroupItem key={error.msg}>
                  {error.param}: {error.msg}
                </ListGroupItem>
              );
            })}
          </ListGroup>
        </Alert>
      )}

      <h1>Sign Up</h1>
      <FormContainer onSubmit={signUpSubmit} buttonText='Sign Up!'>
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
        <FormInput
          id='passwordConfirm'
          label='Password confirm'
          placeholder='Confirm your password!'
          onChange={(e) => changePasswordConfirmHandler(e)}
          isInvalid={errors.passwordConfirm}
          errorMessage={errors.passwordConfirm}
          value={form.passwordConfirm}
          type='password'
          formGroupClass='mt-3'
        />
      </FormContainer>
    </Container>
  );
};

export default SignUp;
