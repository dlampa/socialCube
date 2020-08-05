import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import UserLogin from './js/UserLogin';
import logo from './img/logo_lego.png'
//import { Container, Row, Col } from 'reactstrap'; can we use this for CSS??

import './css/App.css';

class App extends React.Component {
  render() {
    return (
      <article>
 
        <section>
          <h1> Welcome to Lego Social</h1>
          <img src={logo} alt="Logo" />
         

        </section>
    
        <article id="col">
          <section className="UserLogin">
            <h2>Login</h2>
            <UserLogin
            />

          </section>
          <section className="UserSignup">
            <p> (User signup form Place holder)</p>
          </section>
        </article>
      </article>
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
  state => { return { userData: state }, { UserLogin: state } },
)(App); // Name of the component (in this case: App.)} )(App);
