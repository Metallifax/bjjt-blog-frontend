import { Form } from 'react-bootstrap';

const FormInput = ({
  formGroupClass,
  label,
  placeholder,
  onChange,
  isInvalid,
  errorMessage,
}) => {
  return (
    <Form.Group className={formGroupClass || null}>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        placeholder={placeholder || 'Enter text here!'}
        onChange={onChange}
        isInvalid={isInvalid}
      />
      <Form.Control.Feedback type='invalid'>
        {errorMessage}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default FormInput;
