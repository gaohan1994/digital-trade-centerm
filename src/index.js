import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/app';
import reportWebVitals from './reportWebVitals';
import './pages/normalize.css';
import 'antd-mobile/lib/toast/style/css';
import 'antd-mobile/lib/nav-bar/style/css';
import 'antd-mobile/lib/toast/style/css';
import 'react-simple-keyboard/build/css/index.css';
import { configureStore } from '@reduxjs/toolkit';
import { navReducer } from './pages/app';
import { Provider } from 'react-redux';

const store = configureStore({
  reducer: {
    navbar: navReducer,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
