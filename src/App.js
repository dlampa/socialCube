import React from 'react';
import { connect } from 'react-redux';

import UserLogin2 from './UserLogin2';

import logo from './img/PlaceholderLogo.png'
import './css/App.css';

class App extends React.Component {
  render() {
    return (
      <main>

        <section>
          <h1> Welcome to Lego Social</h1>
          <img src={logo} alt="Logo" />
        </section>

        <section>
          <h2>Login</h2>
          <UserLogin2 />
        </section>

        <section>
          <h2>Sign Up</h2>
          <p>(User signup form will be here)</p>
        </section>

      </main>

    );
  }

}


export default connect(
  state => { return { userData: state }},
)(App); // Name of the component (in this case: App.)} )(App);
