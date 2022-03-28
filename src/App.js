import BlogEditor from './components/BlogEditor';
import { useState } from 'react';
import { EditorState } from 'draft-js';
import DisplayMarkupFromEditor from './components/DisplayMarkupFromEditor';

const App = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );

  const pullEditorStateData = (data) => {
    setEditorState(data);
  };

  return (
    <>
      <h1>React Editors</h1>
      <h2>Start editing to see some magic happen!</h2>
      <BlogEditor editorStateData={pullEditorStateData} />
      <DisplayMarkupFromEditor editorState={editorState} />
    </>
  );
};

export default App;
