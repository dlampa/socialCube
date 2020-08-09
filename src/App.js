import React from 'react';

import UserLogin from './UserLogin';
import UserSignup from './UserSignup';

import Logo from './img/logo2.png'
import './css/App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showLogin: false,
      showSignup: false
    }
  }
  retLogin = () => this.setState({ showLogin: true, showSignup: false });
  retSignUp = () => this.setState({ showLogin: false, showSignup: true });
  
  render() {
    return (
      <main>

        {/* Logo is always shown on page */}
        <section id="siteLogo">
          <img src={Logo} alt="Site Logo" />
          <h1 className="sr-only">Social Cube</h1>
        </section>
    
        <section id="loginControls">
          
          {/* Startup scenario - display two buttons, giving a choice to Login or to Sign up */}
          {(!(this.state.showLogin || this.state.showSignup)) ?
            <>
              <button onClick={this.retLogin}>Login</button>
              <button onClick={this.retSignUp}>Sign up</button>
            </>
            : null}
          
          {/* Display UserLogin component with a Sign Up button */}
          {this.state.showLogin ?
            <>
              <UserLogin /> 
              <button onClick={this.retSignUp}>Sign up</button>
            </>
            : null}
          
          {/* Display UserSignup component with a Login button */}
          {this.state.showSignup ?
            <>
              <UserSignup /> 
              <button onClick={this.retLogin}>Login</button>
            </>
            : null}
        
        </section>
        
      </main>
    );
  }

}

export default App;