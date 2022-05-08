import { useEffect, useState } from 'react';

import { useModal } from '@ebay/nice-modal-react';
import Cookies from 'js-cookie';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';

import { setIsLoggedIn } from '../../../features/user/userSlice';
import CustomModal from '../modal/custom-modal/CustomModal';
import LaunchCustomModal from '../modal/custom-modal/LaunchCustomModal';

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const modal = useModal(CustomModal);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginStore = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    if (loginStore) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
      navigate('/login');
    }
  }, [loginStore, navigate]);

  const handleLogout = (choice) => {
    if (choice) {
      dispatch(setIsLoggedIn(false));
      Cookies.remove('token');
    }

    modal.hide();
  };

  return (
    <Navbar bg='primary' expand='lg' variant='dark'>
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>Blogging App</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-0'>
            {loggedIn ? (
              <>
                <LinkContainer to='/'>
                  <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                <LaunchCustomModal
                  type='nav-link'
                  text='Logout'
                  headingText='Logout?'
                >
                  <div>
                    <Button
                      className='mx-1 my-2'
                      onClick={() => handleLogout(true)}
                    >
                      Logout
                    </Button>
                    <Button
                      className='mx-1 my-2'
                      onClick={() => handleLogout(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </LaunchCustomModal>
              </>
            ) : (
              <>
                <LinkContainer to='/login'>
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/signup'>
                  <Nav.Link>Signup</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
