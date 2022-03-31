import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import { useEffect, useState } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useDispatch } from 'react-redux';
import { save, update } from '../../features/editor/editorSlice';
import { useNavigate } from 'react-router-dom';
import './BlogEditor.scss';

const BlogEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(update(editorState));
  }, [editorState, dispatch]);

  const savePostHandler = () => {
    if (editorState.getCurrentContent().getPlainText()) {
      dispatch(save(editorState));
      navigate('/');
    }
  };

  return (
    <>
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
      <div className='btn--container'>
        <button onClick={savePostHandler} className='btn btn-primary'>
          Save!
        </button>
      </div>
    </>
  );
};

export default BlogEditor;
