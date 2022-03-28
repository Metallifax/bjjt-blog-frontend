import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import { useEffect, useState } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const BlogEditor = ({ editorStateData }) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );

  useEffect(() => {
    editorStateData(editorState);
  }, [editorState, editorStateData]);

  return (
    <div
      style={{
        border: '1px solid black',
        padding: '2px',
        minHeight: '400px',
      }}
    >
      <Editor editorState={editorState} onEditorStateChange={setEditorState} />
    </div>
  );
};

export default BlogEditor;
