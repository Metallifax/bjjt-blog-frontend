import { Route, Routes } from 'react-router-dom';
import BlogEditor from './components/editor/BlogEditor';
import { Home } from './components/Home';
import { About } from './components/About';
import { NotFound } from './components/NotFound';

const App = () => {
  return (
    <>
      <h1>Welcome to The App!</h1>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/editor' element={<BlogEditor />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
