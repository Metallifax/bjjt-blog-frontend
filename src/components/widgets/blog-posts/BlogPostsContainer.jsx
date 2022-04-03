import { Container, Row } from 'react-bootstrap';
import BlogPostCard from './blog-post-card/BlogPostCard';

const BlogPostsContainer = ({ posts }) => {
  const getPosts = (postsArr) => {
    return postsArr.map((post) => (
      <BlogPostCard
        title={post.title}
        name={post.name}
        imageUrl={post.imageUrl}
        editorState={post.editorState}
        key={post.title}
      />
    ));
  };

  return (
    <Container>
      <Row style={{ justifyContent: 'center' }}>{posts && getPosts(posts)}</Row>
    </Container>
  );
};

export default BlogPostsContainer;
