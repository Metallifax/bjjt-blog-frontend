import { useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import { Alert, Container, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import api from '../../api';
import { setIsLoggedIn } from '../../features/user/userSlice';
import { useDebounce } from '../../utils';
import FormContainer from '../widgets/custom-forms/FormContainer';
import FormInput from '../widgets/custom-forms/FormInput';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [responseErrors, setResponseErrors] = useState([]);
  const [alertShow, setAlertShow] = useState(false);
  const debouncedResponseErrors = useDebounce(responseErrors, 500);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (debouncedResponseErrors) {
      console.log(debouncedResponseErrors);
    }
  }, [debouncedResponseErrors]);

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
          Cookies.set('token', res.data.token);
          dispatch(setIsLoggedIn(true));
          navigate('/');
        })
        .catch(({ response: { data } }) => {
          setResponseErrors(data);
          setAlertShow(true);
        });
    }
  };

  return (
    <Container className='mt-3'>
      {alertShow && responseErrors.length > 0 && (
        <Alert variant='danger' onClose={() => setAlertShow(false)} dismissible>
          <Alert.Heading>Login failed...</Alert.Heading>
          <p>Here&apos;s what went wrong:</p>
          <ListGroup>
            {responseErrors.map((error) => (
              <ListGroupItem key={error.msg}>{error.msg}</ListGroupItem>
            ))}
          </ListGroup>
        </Alert>
      )}
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
