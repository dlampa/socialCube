import React from 'react';
import ReactDOM from 'react-dom';
import './css/reset.css';
import './css/index.css';

/* Redux setup */
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import userDataReducer from './reducer';

/* React-Router setup */
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


/* Aux support functions */
import { populateStore } from './js';

/* App components*/
import App from './App';
import TestComponent from './TestComponent';
import UserSignup from './UserSignup';

/* Redux global store, the async route is required because we're using an API to fetch the data that prepopulates the store.
   Ref: https://stackoverflow.com/questions/37393176/redux-loading-initial-state-asynchronously */

const createStoreAsync = async () => {
  let store = createStore(
    userDataReducer,
    await populateStore(null),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()); // Redux devtools - remove in "production"
  return await store;
}

const Root = (store) => (
  <Provider store={store.store}>
    <Router>
      <Route path="/" exact component={App} />
      <Switch>
        <Route path="/test/:userid" component={TestComponent} />
        <Route path="/test/" component={TestComponent} />
        <Route path="/signup" component={UserSignup} />
      </Switch>
    </Router>
  </Provider>
);

createStoreAsync().then(
  result => {
    const store = result;
    ReactDOM.render(
      <Root store={store} />,
      document.getElementById("root")
    );
  
});
