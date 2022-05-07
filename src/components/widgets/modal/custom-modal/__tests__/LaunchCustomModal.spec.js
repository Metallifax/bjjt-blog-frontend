// import NiceModal from '@ebay/nice-modal-react';
//
// import {
//   fireEvent,
//   render,
//   renderWithRouter,
//   screen,
//   within,
//   waitFor,
// } from '../../../../../test-utils';
// import LaunchCustomModal from '../LaunchCustomModal';
//
// describe('test the LaunchCustomModal component', () => {
//   test('renders the component', () => {
//     renderWithRouter(<LaunchCustomModal text='text' />);
//
//     expect(screen.getByRole('button', { name: 'text' })).toBeInTheDocument();
//   });
//
//   test("no text in text prop renders default 'Click me!' text", () => {
//     renderWithRouter(<LaunchCustomModal />);
//
//     expect(
//       screen.getByRole('button', { name: 'Click me!' }),
//     ).toBeInTheDocument();
//   });
//
//   test('text in prop renders the text', () => {
//     renderWithRouter(<LaunchCustomModal text='text' />);
//
//     expect(screen.getByRole('button', { name: 'text' })).toHaveTextContent(
//       'text',
//     );
//   });
//
//   test('clicking the launch button opens a modal', () => {
//     render(<LaunchCustomModal headingText='heading' text='text' />, {
//       wrapper: NiceModal.Provider,
//     });
//
//     const button = screen.getByRole('button', { name: 'text' });
//     fireEvent.click(button);
//
//     expect(screen.getByText('heading')).toBeInTheDocument();
//   });
//
//   test('renders default heading upon modal launch', () => {
//     render(<LaunchCustomModal text='text' />, {
//       wrapper: NiceModal.Provider,
//     });
//
//     const button = screen.getByRole('button', { name: 'text' });
//     fireEvent.click(button);
//
//     expect(screen.getByText('Your modal')).toBeInTheDocument();
//   });
//
//   test('passing items as children renders them inside the modal', () => {
//     render(<LaunchCustomModal text='text'>child</LaunchCustomModal>, {
//       wrapper: NiceModal.Provider,
//     });
//
//     const button = screen.getByRole('button', { name: 'text' });
//     fireEvent.click(button);
//
//     expect(screen.getByText('child')).toBeInTheDocument();
//   });
//
// eslint-disable-next-line max-len
//   test("after opening the modal, clicking the 'X' button closes the modal", async () => {
//     render(<LaunchCustomModal headingText='heading' text='text' />, {
//       wrapper: NiceModal.Provider,
//     });
//
//     const button = screen.getByRole('button', { name: 'text' });
//     fireEvent.click(button);
//
//     const heading = screen.getByTestId('close-button');
//     const xButton = within(heading).getByRole('button');
//     fireEvent.click(xButton);
//
//     await waitFor(() =>
//       expect(screen.queryByText('heading')).not.toBeInTheDocument(),
//     );
//   });
//
// eslint-disable-next-line max-len
//   test('after opening the modal, clicking outside the modal closes it', async () => {
//     render(<LaunchCustomModal headingText='heading' text='text' />, {
//       wrapper: NiceModal.Provider,
//     });
//
//     const button = screen.getByRole('button', { name: 'text' });
//     fireEvent.click(button);
//
//     const dialog = screen.getByRole('dialog');
//     fireEvent.click(dialog);
//
//     await waitFor(() =>
//       expect(screen.queryByText('heading')).not.toBeInTheDocument(),
//     );
//   });
// });
