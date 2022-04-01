import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import { useEffect, useState } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useDispatch } from 'react-redux';
import { save, update } from '../../features/editor/editorSlice';
import { useNavigate } from 'react-router-dom';
import { Container, Form } from 'react-bootstrap';
import './BlogEditor.scss';
import FormInput from '../widgets/FormInput';

const BlogEditor = () => {
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
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
      const post = {
        name,
        title,
        imageUrl,
        editorState,
      };

      dispatch(save(post));
      navigate('/');
    }
  };

  return (
    <>
      <h1 className='text-center m-3'>Create a Blog Post!</h1>
      <Container className='container--override'>
        <Form>
          <FormInput
            onChange={(e) => setTitle(e.target.value)}
            label='Title'
            placeholder='Enter a title for your post!'
            formGroupClass='form-group--container'
          />
          <FormInput
            onChange={(e) => setName(e.target.value)}
            label='Name'
            placeholder='Enter your name!'
            formGroupClass='form-group--container'
          />
          <FormInput
            onChange={(e) => setImageUrl(e.target.value)}
            label='Image URL'
            placeholder='Enter your image url!'
            formGroupClass='form-group--container'
          />
        </Form>
        <div className='editor--container'>
          <Editor
            blockStylefn='editor--wrapper'
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
      </Container>
    </>
  );
};

export default BlogEditor;
