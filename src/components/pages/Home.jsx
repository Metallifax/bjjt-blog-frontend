import { useSelector } from 'react-redux';
import BlogPostsContainer from '../widgets/blog-posts/BlogPostsContainer';

const Home = () => {
  const posts = useSelector((state) => state.editor.posts);

  return (
    <>
      <h1 className='text-center m-3'>Home!</h1>
      {posts && <BlogPostsContainer posts={posts} />}
    </>
  );
};

export default Home;
