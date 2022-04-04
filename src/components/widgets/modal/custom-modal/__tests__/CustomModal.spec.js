// import { configureStore } from '@reduxjs/toolkit';
import { cleanup } from '@testing-library/react';

// import editorReducer from '../../../../../features/editor/editorSlice';

// const store = configureStore({
//   reducer: { editor: editorReducer },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });

// const localRender = ({ ...options }) => {
//   renderWithRouter(
//     <Provider store={store}>
//       <CustomModal id='test' {...options} />
//     </Provider>,
//   );
// };

describe('tests run', () => {
  afterEach(() => {
    cleanup();
  });

  test('placeholder', () => {
    expect(true).toBe(true);
  });
});
