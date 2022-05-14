import { Route, Routes } from 'react-router-dom';

import Admin from './components/pages/Admin';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import NotFound from './components/pages/NotFound';
import SignUp from './components/pages/SignUp';
import VerifyEmail from './components/pages/VerifyEmail';
import VerifyEmailPrompt from './components/pages/VerifyEmailPrompt';
import BlogPostDetails from './components/widgets/blog-posts/BlogPostDetails';
import Layout from './components/widgets/layout/Layout';

const App = () => {
  // override dark mode
  document.documentElement.setAttribute('data-color-mode', 'light');

  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/login' element={<Login />} />
        <Route path='/verify-email' element={<VerifyEmailPrompt />} />
        <Route path='/verify/:token' element={<VerifyEmail />} />
        <Route path='*' element={<NotFound />} />
        <Route path='post/:id' element={<BlogPostDetails />} />
      </Routes>
    </Layout>
  );
};

export default App;
