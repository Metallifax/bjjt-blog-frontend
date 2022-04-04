import { Container, Row } from 'react-bootstrap';

import BlogPostCard from './blog-post-card/BlogPostCard';
import './BlogPostsContainer.scss';

const BlogPostsContainer = ({ posts = [] }) => {
  const getPosts = (postsArr) => {
    return postsArr.map((post) => <BlogPostCard post={post} key={post.id} />);
  };

  return (
    <Container>
      <Row className='container--row' style={{ marginTop: 10 }}>
        {posts && getPosts(posts)}
      </Row>
    </Container>
  );
};

export default BlogPostsContainer;
