import { useModal } from '@ebay/nice-modal-react';
import moment from 'moment';
import { Button, Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { deletePost } from '../../../../features/editor/editorSlice';
import './BlogPostCard.scss';
import CustomModal from '../../modal/custom-modal/CustomModal';
import LaunchCustomModal from '../../modal/custom-modal/LaunchCustomModal';

const BlogPostCard = ({ post }) => {
  const textArr = post.editorState.split(' ', 25);
  const date = post.dateCreated;
  const dispatch = useDispatch();
  const modal = useModal(CustomModal);

  const formatted = moment(date).format('MMMM Do YYYY, h:mm:ss a');

  const handleDelete = () => {
    dispatch(deletePost(post));
    modal.hide();
  };

  return (
    <Card
      className='card--container'
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
        width: '18rem',
        margin: '10px',
        padding: 0,
      }}
    >
      <Card.Img className='card--image' variant='top' src={post.imageUrl} />
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Subtitle className='mb-2 text-muted'>{formatted}</Card.Subtitle>
        <Card.Text>
          {textArr.length === 25
            ? textArr.join(' ').concat('...')
            : textArr.join(' ')}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <Card.Text>By: {post.name}</Card.Text>
        <LaunchCustomModal
          buttonClass='btn btn-danger'
          text='Delete'
          headingText='Are you sure?'
        >
          <div className='flex-column'>
            <Button className='btn btn-danger' onClick={handleDelete}>
              Yes
            </Button>
            <Button onClick={() => modal.hide()}>Cancel</Button>
          </div>
        </LaunchCustomModal>
      </Card.Footer>
    </Card>
  );
};

export default BlogPostCard;
