import { Button, Form } from 'react-bootstrap';

const FormContainer = ({ children, onSubmit, buttonText }) => {
  return (
    <Form onSubmit={onSubmit}>
      {children}
      <Button>{buttonText}</Button>
    </Form>
  );
};

export default FormContainer;
