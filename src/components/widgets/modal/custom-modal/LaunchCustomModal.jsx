import { Button } from 'react-bootstrap';
import { useState } from 'react';
import CustomModal from './CustomModal';

const LaunchCustomModal = ({ text, children, headingText }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant='primary' onClick={handleShow}>
        {text || 'Click me!'}
      </Button>

      <CustomModal
        headingText={headingText}
        show={show}
        handleClose={handleClose}
      >
        {children}
      </CustomModal>
    </>
  );
};

export default LaunchCustomModal;
