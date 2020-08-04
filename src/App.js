import React from 'react';
import { connect }  from 'react-redux';
import { Link } from 'react-router-dom';
import { loginUser } from './actions';

import './css/App.css';

class App extends React.Component {

  testUserLogin = (user) => {
    this.props.dispatch(loginUser("damir"));
  }

  render()
  {
    return (
      <div className="App">
        <Link to="/test">Test</Link>
        <Link to="/test/test123">Test123</Link>
        <button onClick={this.testUserLogin}>Login Damir</button>
      </div>
    );
  }

}


// function App() {
  
//   return (
//     <div className="App">
//       <Link to="/test">Test</Link>
//       <Link to="/test/test123">Test123</Link>
//     </div>
//   );
// }

export default connect(
  state => { return { userData: state } } )(App);
