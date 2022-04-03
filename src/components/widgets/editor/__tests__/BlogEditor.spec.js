import React from 'react';
import {
  cleanup,
  fireEvent,
  renderWithRouter,
  screen,
} from '../../../../test-utils';
import BlogEditor from '../BlogEditor';
import { configureStore } from '@reduxjs/toolkit';
import editorReducer from '../../../../features/editor/editorSlice';
import { Provider } from 'react-redux';

const store = configureStore({
  reducer: { editor: editorReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const localRender = () => {
  renderWithRouter(
    <Provider store={store}>
      <BlogEditor />
    </Provider>,
  );
};

describe('BlogEditor component tests', () => {
  afterEach(() => {
    cleanup();
  });

  test('BlogEditor should render', () => {
    localRender();

    expect(screen.getByText('Create a Blog Post!')).toBeInTheDocument();
  });

  // eslint-disable-next-line max-len
  test("When 'Save!' is pressed with no input content, all inputs should show error", () => {
    localRender();

    const submitButton = screen.getByRole('button', { name: 'Save!' });
    fireEvent.click(submitButton);

    const inputs = screen.getAllByTestId('input');
    expect(inputs[0]).toHaveTextContent('Cannot be blank');
    expect(inputs[1]).toHaveTextContent('Cannot be blank');
    expect(inputs[2]).toHaveTextContent('Cannot be blank');
  });

  test('when text is entered in title input, it changes', () => {
    localRender();

    const titleInput = screen.getByLabelText('Title');
    fireEvent.change(titleInput, { target: { value: 'hello' } });

    expect(titleInput.value).toBe('hello');
  });

  test('when text is entered in name input, it changes', () => {
    localRender();

    const nameInput = screen.getByLabelText('Name');
    fireEvent.change(nameInput, { target: { value: 'hello' } });

    expect(nameInput.value).toBe('hello');
  });

  test('when test is entered in imageUrl input, it changes', () => {
    localRender();

    const imageUrlInput = screen.getByLabelText('Image URL');
    fireEvent.change(imageUrlInput, { target: { value: 'hello' } });

    expect(imageUrlInput.value).toBe('hello');
  });

  // eslint-disable-next-line max-len
  test('after triggering error then re-entering text, errors go away', () => {
    localRender();

    const submitButton = screen.getByRole('button', { name: 'Save!' });
    fireEvent.click(submitButton);

    const inputs = screen.getAllByTestId('input');
    expect(inputs[0]).toHaveTextContent('Cannot be blank');

    const input = screen.getByLabelText('Title');
    fireEvent.change(input, { target: { value: 'hello' } });

    expect(inputs[0]).not.toHaveTextContent('Cannot be blank');
  });
});
