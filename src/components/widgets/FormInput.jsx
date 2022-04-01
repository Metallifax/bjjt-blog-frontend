import { Form } from 'react-bootstrap';

const FormInput = ({ formGroupClass, label, placeholder, onChange }) => {
  return (
    <Form.Group className={formGroupClass || null}>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        placeholder={placeholder || 'Enter text here!'}
        onChange={onChange}
      />
    </Form.Group>
  );
};

export default FormInput;
