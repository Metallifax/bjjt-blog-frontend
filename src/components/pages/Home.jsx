import { useSelector } from 'react-redux';
import BlogPostsContainer from '../widgets/blog-posts/BlogPostsContainer';
import LaunchCustomModal from '../widgets/modal/custom-modal/LaunchCustomModal';
import './Home.scss';
const Home = () => {
  const posts = useSelector((state) => state.editor.posts);

  return (
    <>
      <h1 className='text-center m-3'>Home!</h1>
      <div className='launch-editor'>
        <LaunchCustomModal text='Create a post' />
      </div>
      {posts && <BlogPostsContainer posts={posts} />}
    </>
  );
};

export default Home;
