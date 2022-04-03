import { Route, Routes } from 'react-router-dom';
import BlogEditor from './components/widgets/editor/BlogEditor';
import Home from './components/pages/Home';
import About from './components/pages/About';
import NotFound from './components/pages/NotFound';
import Layout from './components/widgets/layout/Layout';

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
