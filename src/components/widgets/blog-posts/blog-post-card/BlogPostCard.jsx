import moment from 'moment';
import { Button, Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { deletePost } from '../../../../features/editor/editorSlice';
import './BlogPostCard.scss';

const BlogPostCard = ({ post }) => {
  const textArr = post.editorState.split(' ', 25);
  const date = post.dateCreated;
  const dispatch = useDispatch();

  const formatted = moment(date).format('MMMM Do YYYY, h:mm:ss a');

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
        <Button onClick={() => dispatch(deletePost(post))}>Delete</Button>
      </Card.Footer>
    </Card>
  );
};

export default BlogPostCard;
