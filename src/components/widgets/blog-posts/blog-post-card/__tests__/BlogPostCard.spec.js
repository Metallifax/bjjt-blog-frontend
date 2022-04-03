import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import editorReducer from '../../../../../features/editor/editorSlice';
import { cleanup, renderWithRouter, screen } from '../../../../../test-utils';
import BlogPostCard from '../BlogPostCard';

const store = configureStore({
  reducer: { editor: editorReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const testData = {
  title: 'test title',
  name: 'test name',
  imageUrl:
    'https://www.grouphealth.ca/wp-content/uploads/2018/05/placeholder-image.png',
  editorState: 'test editor',
};

const localRender = (data) => {
  const { title, name, imageUrl, editorState } = data;

  renderWithRouter(
    <Provider store={store}>
      <BlogPostCard
        title={title}
        name={name}
        imageUrl={imageUrl}
        editorState={editorState}
      />
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
  });
});
