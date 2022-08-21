import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createStore } from '@reduxjs/toolkit';
import todoReducer  from './data/reducers';
import store from './data/store';



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

  <Provider store={store}>
    <App />
  </Provider>
);
reportWebVitals();
