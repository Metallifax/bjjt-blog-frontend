import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Modal } from 'react-bootstrap';

const CustomModal = NiceModal.create(
  ({ headingText, show, handleClose, children }) => {
    const modal = useModal();

    return (
      <Modal size='lg' show={modal.visible} onHide={() => modal.hide()}>
        <Modal.Header data-testid='close-button' closeButton>
          <Modal.Title>{headingText ? headingText : 'Your modal'}</Modal.Title>
        </Modal.Header>
        {children}
      </Modal>
    );
  },
);

export default CustomModal;
