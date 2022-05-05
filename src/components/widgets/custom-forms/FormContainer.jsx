import { Button, Form } from 'react-bootstrap';

const FormContainer = ({ children, onSubmit, buttonText }) => {
  return (
    <Form aria-label='form' onSubmit={onSubmit}>
      {children}
      <Button type='submit' className='mt-4'>
        {buttonText || 'Go!'}
      </Button>
    </Form>
  );
};

export default FormContainer;
