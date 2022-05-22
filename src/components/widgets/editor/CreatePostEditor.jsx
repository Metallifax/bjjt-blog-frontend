import { useState } from 'react';

import { useModal } from '@ebay/nice-modal-react';
import MDEditor from '@uiw/react-md-editor';
import Cookies from 'js-cookie';
import { Button, Container, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import rehypeSanitize from 'rehype-sanitize';

import api from '../../../api';
import './BlogEditor.scss';
import FormInput from '../custom-forms/FormInput';
import CustomModal from '../modal/custom-modal/CustomModal';

const CreatePostEditor = () => {
  const [editorState, setEditorState] = useState('hello there!');
  const modal = useModal(CustomModal);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const user = useSelector((state) => state.user.user);

  const findFormErrors = () => {
    const { title, imageUrl } = form;
    const newErrors = {};
    const editorText = editorState;

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

  const changeImageUrlHandler = (e) => {
    setField('imageUrl', e.target.value);
  };

  const savePostHandler = async (e) => {
    e.preventDefault();

    const newErrors = findFormErrors();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else if (editorState) {
      const token = Cookies.get('token');

      return await api
        .post(
          `/api/user/${user.id}/post`,
          {
            title: form.title,
            content: editorState,
            imageUrl: form.imageUrl,
            dateCreated: Date.now(),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          modal.hide();
        });
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

export default CreatePostEditor;
