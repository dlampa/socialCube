import React from 'react';
import { connect } from 'react-redux';

import UserLogin from './UserLogin';
import UserSignup from './UserSignup';

import Logo from './img/logo.png'
import './css/App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showLogin: false,
      showSignup: false,
      currentUser: this.props.currentUser
    }
  }

  /* This is necessary to induce an update in state on update in props. The purpose is to
     prevent the displaying of the normal login in case where the user is already logged in.
     Instead, the user is routed to the TimelinePage component. 
     ref: https://stackoverflow.com/a/52539260/12802214 */
  componentDidUpdate(prevProps, prevState) {
    if (this.props.currentUser !== prevProps.currentUser) {
      this.setState({ currentUser: this.props.currentUser });
    }
  }
  retLogin = () => this.setState({ showLogin: true, showSignup: false });
  retSignUp = () => this.setState({ showLogin: false, showSignup: true });
  
  render() {
    // If an user is already logged in, reroute from / to /timeline/
    if (this.state.currentUser !== undefined) {
      this.props.history.push("/timeline/");
      return null;

    // Otherwise, display all the login magic
    } else {
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

}

export default connect(
  (state) => {
    const [loggedInUser] = state.map(userObject => {
      // Take the key from the userObject as it represents the username, store it in userIter
      const userIter = Object.keys(userObject).toString();
      // Deconstruct the userObject object to obtain the value of isLoggedIn key 
      const { [userIter]: { auth: { isLoggedIn: loginStatus } } } = userObject;
      // If loginStatus is true, return the name of the user otherwise return null
      return loginStatus ? userIter : null;
      // Filter out the resulting array to obtain only the logged in user's name
    }).filter(userObject => (userObject !== null));

    return {
      currentUser: loggedInUser
    };
    
  })(App);