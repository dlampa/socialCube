import React from 'react';
import ReactDOM from 'react-dom';
import './css/reset.css';
import './css/index.css';

/* Redux setup */
import { createStore } from 'redux';
import { Provider } from 'react-redux';

/* App components*/
import App from './App';

/* Redux global store 
const store = createStore();

*/

const AppRoot = (store) => (
  <Provider store={store.store}>
    <App />
  </Provider>
)


ReactDOM.render(
    <AppRoot store={store} />,
  document.getElementById('root')
);

