import { Route, Routes } from 'react-router-dom';
import BlogEditor from './components/editor/BlogEditor';
import Home from './components/Home';
import About from './components/About';
import NotFound from './components/NotFound';
import Layout from './components/layout/Layout';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/editor' element={<BlogEditor />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

export default App;
