import { Route, Routes } from 'react-router-dom';

import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';
import BlogPostDetails from './components/widgets/blog-posts/BlogPostDetails';
import Layout from './components/widgets/layout/Layout';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='*' element={<NotFound />} />
        <Route path='post/:id' element={<BlogPostDetails />} />
      </Routes>
    </Layout>
  );
};

export default App;
