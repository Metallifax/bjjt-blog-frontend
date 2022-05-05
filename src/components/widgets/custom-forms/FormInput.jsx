import { Form } from 'react-bootstrap';

const FormInput = ({
  id,
  formGroupClass,
  label,
  placeholder,
  onChange,
  isInvalid,
  errorMessage,
  value,
  type,
}) => {
  return (
    <Form.Group data-testid='input' className={formGroupClass || null}>
      {label && <Form.Label htmlFor={id}>{label}</Form.Label>}
      <Form.Control
        id={id}
        placeholder={placeholder || 'Enter text here!'}
        onChange={onChange}
        type={type}
        isInvalid={isInvalid}
        value={value}
      />
      <Form.Control.Feedback type='invalid'>
        {errorMessage}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default FormInput;
