import { Card } from 'react-bootstrap';
import './BlogPostCard.scss';

const BlogPostCard = ({ title, name, imageUrl, editorState }) => {
  const textArr = editorState.getCurrentContent().getPlainText().split(' ', 25);

  return (
    <Card
      className='card--container'
      style={{ width: '18rem', margin: '10px' }}
    >
      <Card.Img className='card--image' variant='top' src={imageUrl} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {textArr.length === 25
            ? textArr.join(' ').concat('...')
            : textArr.join(' ')}
        </Card.Text>
      </Card.Body>
      <Card.Footer>By: {name}</Card.Footer>
    </Card>
  );
};

export default BlogPostCard;
