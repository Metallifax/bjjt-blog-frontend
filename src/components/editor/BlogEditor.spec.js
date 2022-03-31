import React from 'react';
import { renderWithRouter, screen } from '../../test-utils';
import BlogEditor from './BlogEditor';
import { configureStore } from '@reduxjs/toolkit';
import editorReducer from '../../features/editor/editorSlice';
import { Provider } from 'react-redux';

describe('BlogEditor component tests', () => {
  const store = configureStore({
    reducer: { editor: editorReducer },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render', () => {
    renderWithRouter(
      <Provider store={store}>
        <BlogEditor />
      </Provider>,
    );

    const editor = screen.getByLabelText('rdw-wrapper');
    expect(editor).toBeInTheDocument();
  });
});
