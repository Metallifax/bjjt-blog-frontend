import React from 'react';

import NiceModal from '@ebay/nice-modal-react';
import ReactDOM from 'react-dom';
import './index.scss';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <NiceModal.Provider>
        <App />
      </NiceModal.Provider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
