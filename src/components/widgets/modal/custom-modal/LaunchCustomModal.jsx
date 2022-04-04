import NiceModal from '@ebay/nice-modal-react';
import { Button } from 'react-bootstrap';

import CustomModal from './CustomModal';

const LaunchCustomModal = ({ text, children, headingText }) => {
  const showCustomModal = () => {
    NiceModal.show(CustomModal, {
      text: text,
      headingText: headingText,
      children: children,
    });
  };

  return (
    <>
      <Button variant='primary' onClick={showCustomModal}>
        {text || 'Click me!'}
      </Button>
    </>
  );
};

export default LaunchCustomModal;
