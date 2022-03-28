import BlogEditor from './components/editor/BlogEditor';
import DisplayMarkupFromEditor from './components/editor/DisplayMarkupFromEditor';
import store from './store';
import { Provider } from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <h1>Editor Test</h1>
      <BlogEditor />
      <DisplayMarkupFromEditor />
    </Provider>
  );
};

export default App;
