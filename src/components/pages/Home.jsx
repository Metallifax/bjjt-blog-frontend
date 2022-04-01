import { useSelector } from 'react-redux';
import { Card, Container, Row } from 'react-bootstrap';

const Home = () => {
  const posts = useSelector((state) => state.editor.posts);

  const getPosts = (postsArr) => {
    return postsArr.map((post) => {
      const textArr = post.editorState
        .getCurrentContent()
        .getPlainText()
        .split(' ', 25);

      return (
        <Card style={{ width: '18rem', margin: '10px' }} key={post.title}>
          <Card.Img variant='top' src={post.imageUrl} />
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>
              {textArr.length === 25
                ? textArr.join(' ').concat('...')
                : textArr.join(' ')}
            </Card.Text>
          </Card.Body>
          <Card.Footer>By: {post.name}</Card.Footer>
        </Card>
      );
    });
  };

  return (
    <>
      <h1 className='text-center m-3'>Home!</h1>
      <Container>
        <Row style={{ justifyContent: 'center' }}>
          {posts && getPosts(posts)}
        </Row>
      </Container>
    </>
  );
};

export default Home;
