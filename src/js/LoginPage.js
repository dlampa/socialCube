import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import UserLogin from './js/UserLogin';
import logo from './img/logo';

import './css/App.css';

class LoginPage extends React.Component {
    render() {
        return (
            <article>
                <column>
                    <h1> Welcome to Lego Social</h1>
                    <img src={logo} alt="Logo"> </img>

                </column>
                <article>
                    <section className="UserLogin">
                        <UserLogin
                        />
                    </section>
                    <section className="UserSignup">
                        <p>User signup form Place holder</p>
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
