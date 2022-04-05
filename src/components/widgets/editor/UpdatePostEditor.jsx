import { useState } from 'react';

import { useModal } from '@ebay/nice-modal-react';
import MDEditor from '@uiw/react-md-editor';
import { Button, Container, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import rehypeSanitize from 'rehype-sanitize';

import { update } from '../../../features/editor/editorSlice';
import FormInput from '../FormInput';
import CustomModal from '../modal/custom-modal/CustomModal';

const UpdatePostEditor = ({ post }) => {
  // const posts = useSelector((state) => state.editor.posts);
  const [editorState, setEditorState] = useState(post.editorState);
  const dispatch = useDispatch();
  const modal = useModal(CustomModal);
  const [form, setForm] = useState({
    id: post.id,
    title: post.title,
    name: post.name,
    imageUrl: post.imageUrl,
    editorState: post.editorState,
    dateCreated: post.dateCreated,
  });
  const [errors, setErrors] = useState({});

  const findFormErrors = () => {
    const { name, title, imageUrl } = form;
    const newErrors = {};
    const editorText = editorState;

    if (!name || name === '') newErrors.name = 'Cannot be blank';
    if (!title || title === '') newErrors.title = 'Cannot be blank';
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

    // let id;
    // if (posts.length === 0) {
    //   id = 1;
    // } else {
    //   id = posts[posts.length - 1].id + 1;
    // }

    const newErrors = findFormErrors();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else if (editorState) {
      const post = {
        id: form.id,
        name: form.name,
        title: form.title,
        imageUrl: form.imageUrl,
        editorState,
        dateCreated: form.dateCreated,
      };

      dispatch(update(post));
      modal.hide();
    } else {
      // Temporary thing, will add reactivity later
      console.log('Editor content cannot be empty!');
    }
  };

  return (
    <>
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
            value={form.title}
          />
          <FormInput
            id='name'
            onChange={(e) => changeNameHandler(e)}
            label='Name'
            placeholder='Enter your name!'
            formGroupClass='form-group--container'
            isInvalid={!!errors.name}
            errorMessage={errors.name}
            value={form.name}
          />
          <FormInput
            id='imageUrl'
            onChange={(e) => changeImageUrlHandler(e)}
            label='Image URL'
            placeholder='Enter your image url!'
            formGroupClass='form-group--container'
            isInvalid={!!errors.imageUrl}
            errorMessage={errors.imageUrl}
            value={form.imageUrl}
          />
          <div className='editor--container'>
            <MDEditor
              value={editorState}
              onChange={setEditorState}
              previewOptions={{
                rehypePlugins: [[rehypeSanitize]],
              }}
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

export default UpdatePostEditor;
