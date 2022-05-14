import { useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import api from '../../api';
import { setIsLoggedIn } from '../../features/user/userSlice';

const VerifyEmail = () => {
  const { token } = useParams();
  const [authorized, setAuthorized] = useState(false);
  const dispatch = useDispatch();

  const verificationStatus = async () => {
    await api
      .get(`/api/auth/verify/${token}`)
      .then((res) => {
        Cookies.set('token', res.data.token);
        dispatch(setIsLoggedIn(true));
        setAuthorized(true);
      })
      .catch((err) => {
        console.log(err);
        setAuthorized(false);
      });
  };

  useEffect(() => verificationStatus());

  return (
    <Container className='mt-3'>
      <h1>Email Verification</h1>
      {authorized ? (
        <>
          <p>User account has been verified!</p>
          <p>
            <Link to='/'>Click here </Link>to visit home page or click
            &quot;Home&quot; in the nav bar!
          </p>
        </>
      ) : (
        <p>User account not verified...</p>
      )}
    </Container>
  );
};

export default VerifyEmail;
