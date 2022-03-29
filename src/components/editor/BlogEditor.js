import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import { useEffect, useState } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useDispatch } from 'react-redux';
import { update } from '../../features/editor/editorSlice';

const BlogEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(update(editorState));
  }, [editorState, dispatch]);

  return (
    <div
      style={{
        border: '1px solid black',
        padding: '2px',
        minHeight: '400px',
      }}
    >
      <Editor
        data-testid='editor'
        editorState={editorState}
        onEditorStateChange={setEditorState}
      />
    </div>
  );
};

export default BlogEditor;
