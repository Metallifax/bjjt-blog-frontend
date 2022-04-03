import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import { useEffect, useState } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useDispatch } from 'react-redux';
import { save, update } from '../../../features/editor/editorSlice';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Form } from 'react-bootstrap';
import './BlogEditor.scss';
import FormInput from '../FormInput';

const BlogEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithText('Enter here to create your post!'),
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  const findFormErrors = () => {
    const { name, title, imageUrl } = form;
    const newErrors = {};
    const editorText = editorState.getCurrentContent().getPlainText();

    // name errors
    if (!name || name === '') newErrors.name = 'Cannot be blank';

    // title errors
    if (!title || title === '') newErrors.title = 'Cannot be blank';

    // imageUrl
    if (!imageUrl || imageUrl === '') newErrors.imageUrl = 'Cannot be blank';

    if (!editorText || editorText === '') newErrors.editor = 'Cannot be blank';

    return newErrors;
  };

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });

    if (errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };

  useEffect(() => {
    dispatch(update(editorState));
  }, [editorState, dispatch]);

  const changeTitleHandler = (e) => {
    setField('title', e.target.value);
  };

  const changeNameHandler = (e) => {
    setField('name', e.target.value);
  };

  const changeImageUrlHandler = (e) => {
    setField('imageUrl', e.target.value);
  };

  const savePostHandler = (e) => {
    e.preventDefault();

    const newErrors = findFormErrors();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      if (editorState.getCurrentContent().getPlainText()) {
        const post = {
          name: form.name,
          title: form.title,
          imageUrl: form.imageUrl,
          editorState,
        };

        dispatch(save(post));
        navigate('/');
      } else {
        // Temporary thing, will add reactivity later
        console.log('Editor content cannot be empty!');
      }
    }
  };

  return (
    <>
      <h1 className='text-center m-3'>Create a Blog Post!</h1>
      <Container className='container--override'>
        <Form onSubmit={savePostHandler}>
          <FormInput
            id='title'
            onChange={(e) => changeTitleHandler(e)}
            label='Title'
            placeholder='Enter a title for your post!'
            formGroupClass='form-group--container'
            isInvalid={!!errors.title}
            errorMessage={errors.title}
          />
          <FormInput
            id='name'
            onChange={(e) => changeNameHandler(e)}
            label='Name'
            placeholder='Enter your name!'
            formGroupClass='form-group--container'
            isInvalid={!!errors.name}
            errorMessage={errors.name}
          />
          <FormInput
            id='imageUrl'
            onChange={(e) => changeImageUrlHandler(e)}
            label='Image URL'
            placeholder='Enter your image url!'
            formGroupClass='form-group--container'
            isInvalid={!!errors.imageUrl}
            errorMessage={errors.imageUrl}
          />
          <div className='editor--container'>
            <Editor
              blockStylefn='editor--wrapper'
              data-testid='editor'
              editorState={editorState}
              onEditorStateChange={setEditorState}
            />
          </div>
          <Button variant='primary' type='submit' className='my-btn--container'>
            Save!
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default BlogEditor;
