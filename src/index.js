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

/* Redux global store */
const createStoreAsync = async () => {
  let store = createStore(userDataReducer, await populateStore(null), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  return await store;
}

// const store = createStore(
//   userDataReducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   );
  
//populateStore(store);

const Root = (store) => (
  <Provider store={store.store}>
    <Router>
      <Route path="/" exact component={App} />
      <Switch>
        <Route path="/test/:userid" component={TestComponent} />
        <Route path="/test" component={TestComponent} />
      </Switch>
    </Router>
  </Provider>
);

createStoreAsync().then(result => {
  const store = result;
  ReactDOM.render(
    <Root store={store} />,
    document.getElementById("root")
  );
  
});
