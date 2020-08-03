import React from 'react';
import ReactDOM from 'react-dom';
import './css/reset.css';
import './css/index.css';

/* Redux setup */
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import userDataReducer from './reducer';


/* Aux support functions */
import { populateStore } from './js';

/* App components*/
import App from './App';

/* Redux global store */
const store = createStore(
  userDataReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // TODO: remove before publishing
);

populateStore(store);

const AppRoot = (store) => (
  <Provider store={store.store}>
    <App />
  </Provider>
)


ReactDOM.render(
    <AppRoot store={store} />,
  document.getElementById("root")
);

