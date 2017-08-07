// React
import React from 'react';
import ReactDOM from 'react-dom';
// Redux
import { Provider } from 'react-redux';
import store from './store';
// Components
import App from './components/App';
// Styles
import './index.css';
// Other
import registerServiceWorker from './registerServiceWorker';
import { check_login } from './api/login';

// check if the token is in storage and update redux if it is
check_login(store.dispatch);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
);
registerServiceWorker();
