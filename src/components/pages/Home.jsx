// import { useEffect } from 'react';

// import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

import BlogPostsContainer from '../widgets/blog-posts/BlogPostsContainer';
import CreatePostEditor from '../widgets/editor/CreatePostEditor';
import LaunchCustomModal from '../widgets/modal/custom-modal/LaunchCustomModal';
import './Home.scss';

const Home = () => {
  // const navigate = useNavigate();
  const posts = useSelector((state) => state.editor.posts);

  // // disabled while I finalize the re-routing logic
  // useEffect(() => {
  //   const getCookie = Cookies.get('hey');
  //
  //   if (!getCookie) {
  //     navigate('/signup');
  //   }
  // }, [navigate]);

  return (
    <>
      <h1 className='text-center m-3'>Home!</h1>
      <div className='launch-editor'>
        <LaunchCustomModal text='Create a post'>
          <CreatePostEditor />
        </LaunchCustomModal>
      </div>
      {posts && <BlogPostsContainer posts={posts} />}
    </>
  );
};

export default Home;
