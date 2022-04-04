import { Route, Routes } from 'react-router-dom';

import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';
import Layout from './components/widgets/layout/Layout';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

export default App;
