import { Container } from 'react-bootstrap';

const VerifyEmailPrompt = () => {
  return (
    <Container className='mt-3'>
      <h1>Please check your email</h1>
      <p style={{ width: '50%' }}>
        To verify that the supplied e-mail is valid, please check your e-mail
        for a message from us and click the link to verify your account!
      </p>
      <p style={{ width: '50%' }}>
        After you click the link, you should be re-directed to our home page!
      </p>
    </Container>
  );
};

export default VerifyEmailPrompt;
