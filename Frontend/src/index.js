import React from 'react';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store';
import AlertTemplate from 'react-alert-template-basic'
import { positions, transitions, Provider as AlertProvider } from 'react-alert';
import ReactDOM from 'react-dom';

const option = {
  timeout: 5000,
  postion: positions.BOTTOM_CENTER,
  transition: transitions.SCALE
}

// const root = ReactDOM.createRoot(document.getElementById('root'));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...option} >
        <App />
      </AlertProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
