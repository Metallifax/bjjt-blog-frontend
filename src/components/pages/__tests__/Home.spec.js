import { render, screen } from '../../../test-utils';
import Home from '../Home';
// import { save } from '../../../features/editor/editorSlice';
// import { EditorState } from 'draft-js';

describe('home page tests', () => {
  test('renders the component', () => {
    render(<Home />);
    expect(screen.getByText(/home!/i)).toBeInTheDocument();
  });

  test('there should be no list items with empty store', () => {
    render(<Home />, {
      reduxState: {
        value: undefined,
        posts: [],
      },
    });

    expect(screen.queryByRole('li')).not.toBeInTheDocument();
  });

  test('getPosts() should return a list of posts', () => {});

  // // On hold until we can find a way to update redux state and display
  // // it in the view
  // test('there should be a list item with text with store item', () => {
  //   render(<Home />, {
  //     posts: save(EditorState.createWithText('hello there!')),
  //   });
  //
  //   expect(
  //     screen.getByRole('li', { name: /hello there!/i }),
  //   ).toBeInTheDocument();
  // });
});
