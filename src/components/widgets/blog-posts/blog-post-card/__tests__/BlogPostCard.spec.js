import NiceModal from '@ebay/nice-modal-react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import editorReducer from '../../../../../features/editor/editorSlice';
import {
  cleanup,
  fireEvent,
  renderWithRouter,
  screen,
  waitFor,
} from '../../../../../test-utils';
import BlogPostCard from '../BlogPostCard';

const store = configureStore({
  reducer: { editor: editorReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const testData = {
  id: 1,
  date: 1,
  title: 'test title',
  name: 'test name',
  imageUrl:
    'https://www.grouphealth.ca/wp-content/uploads/2018/05/placeholder-image.png',
  editorState: 'test editor',
};

const localRender = (data) => {
  renderWithRouter(
    <Provider store={store}>
      <BlogPostCard post={data} />
    </Provider>,
  );
};

const renderWithModalProvider = (data) => {
  renderWithRouter(
    <Provider store={store}>
      <NiceModal.Provider>
        <BlogPostCard post={data} />
      </NiceModal.Provider>
    </Provider>,
  );
};

describe('BlogEditor component tests', () => {
  afterEach(() => {
    cleanup();
  });

  test('BlogPostCard should render', () => {
    localRender(testData);

    expect(screen.getByText('test title')).toBeInTheDocument();
  });

  describe('Component should render all of the props', () => {
    test('that title exists and is correct', () => {
      localRender(testData);

      expect(screen.getByText('test title')).toHaveTextContent(testData.title);
    });

    test('that name exists and is correct', () => {
      localRender(testData);

      expect(screen.getByText('By: test name')).toHaveTextContent(
        `By: ${testData.name}`,
      );
    });

    test('that imageUrl exists and is correct', () => {
      localRender(testData);

      expect(screen.getByRole('img').src).toContain(testData.imageUrl);
    });

    test('that content exists and displays with minimum text', () => {
      localRender(testData);

      expect(screen.getByText('test editor')).toHaveTextContent(
        testData.editorState,
      );
    });

    // eslint-disable-next-line max-len
    test("that it doesn't render all of the lines from a long post content", () => {
      const alteredData = { ...testData };
      alteredData.editorState =
        'this line is more than twenty five words in order to test of ' +
        'this does indeed only display 25 words from the editor state ' +
        "so that it doesn't drag on and on";

      localRender(alteredData);

      expect(
        screen.queryByText(alteredData.editorState),
      ).not.toBeInTheDocument();
    });

    test("that exactly 25 lines + '...' is rendered when long phrase", () => {
      const alteredData = { ...testData };
      alteredData.editorState =
        'this line is more than twenty five words in order to test of ' +
        'this does indeed only display 25 words from the editor state ' +
        "so that it doesn't drag on and on";

      localRender(alteredData);

      const testString = alteredData.editorState
        .split(' ', 25)
        .join(' ')
        .concat('...');

      expect(screen.getByText(testString)).toBeInTheDocument();
    });

    test('pressing the delete button opens a modal', () => {
      renderWithModalProvider(testData);

      const deleteButton = screen.getByText('Delete');
      fireEvent.click(deleteButton);

      expect(screen.getByText('Are you sure?')).toBeInTheDocument();
    });

    test('modal contains another delete button', () => {
      renderWithModalProvider(testData);

      const deleteButton = screen.getByText('Delete');
      fireEvent.click(deleteButton);

      expect(screen.getByText('Yes')).toBeInTheDocument();
    });

    test('modal contains a cancel button', () => {
      renderWithModalProvider(testData);

      const deleteButton = screen.getByText('Delete');
      fireEvent.click(deleteButton);

      expect(screen.getByText('Cancel')).toBeInTheDocument();
    });

    // eslint-disable-next-line max-len
    test('pressing the cancel button closes the modal and leaves the post', async () => {
      renderWithModalProvider(testData);

      const deleteButton = screen.getByText('Delete');
      fireEvent.click(deleteButton);

      const cancelButton = screen.getByText('Cancel');
      fireEvent.click(cancelButton);

      await waitFor(() =>
        expect(screen.queryByText('Are you sure?')).not.toBeInTheDocument(),
      );
    });

    // eslint-disable-next-line max-len
    test('pressing the yes button closes the modal too', async () => {
      renderWithModalProvider(testData);

      const deleteButton = screen.getByText('Delete');
      fireEvent.click(deleteButton);

      const yesButton = screen.getByText('Yes');
      fireEvent.click(yesButton);

      await waitFor(() => {
        expect(screen.queryByText('Are you sure')).not.toBeInTheDocument();
      });
    });
  });
});
