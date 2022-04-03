import { Modal } from 'react-bootstrap';

const CustomModal = ({ headingText, show, handleClose, children }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header data-testid='close-button' closeButton>
        <Modal.Title>{headingText ? headingText : 'Your modal'}</Modal.Title>
      </Modal.Header>
      {children}
    </Modal>
  );
};

export default CustomModal;
