import NiceModal from '@ebay/nice-modal-react';
import { Button, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import CustomModal from './CustomModal';

const LaunchCustomModal = ({
  text,
  type,
  children,
  headingText,
  buttonClass,
}) => {
  const showCustomModal = () => {
    NiceModal.show(CustomModal, {
      text: text,
      headingText: headingText,
      children: children,
    });
  };

  const navLinkType = () => (
    <LinkContainer to='#' onClick={showCustomModal}>
      <Nav.Link active={false}>{text || 'Click me!'}</Nav.Link>
    </LinkContainer>
  );

  const defaultType = () => (
    <>
      <Button
        className={buttonClass}
        variant='primary'
        onClick={showCustomModal}
      >
        {text || 'Click me!'}
      </Button>
    </>
  );

  return <>{type === 'nav-link' ? navLinkType() : defaultType()}</>;
};

export default LaunchCustomModal;
