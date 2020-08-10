import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { loginUser, logOffUser } from './actions';

import './css/UserLogin.css';

class UserLogin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loginUsername: "",
            loginPassword: "",
            errorLogin: -1,

            errMsgLogin: ["User does not exist", "Password incorrect.", "Login/Password fields must be filled in."],
            showMenu: false
        };
    }

    // Save values into the local state and clear error display 
    updateState = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        this.setState({ errorLogin: -1 });
    };

    doesUserExist = (user) => {
        const userList = this.props.authInfo.map(userObject => Object.keys(userObject).toString());
        return userList.indexOf(user) > -1;
    };

    isPasswordValid = (user, password) => {
        // Check if the login details match whatever is in the store
        if (this.doesUserExist(user)) {
            const userList = this.props.authInfo.map(userObject => Object.keys(userObject).toString());
            const { [user]: dbPassword } = this.props.authInfo[userList.indexOf(user)];
            return (dbPassword === password);
        } else {
            // If false: display error message 
            this.setState({ errorLogin: 0 });
        };
    };

    userLogin = (event) => {
        // Prevent default action
        event.preventDefault();

        if (this.isPasswordValid(this.state.loginUsername, this.state.loginPassword)) {
            // If true: 1. mark the user as logged in by using a loginUser action from the redux store
            this.props.dispatch(loginUser(this.state.loginUsername));
            // 2. Redirect the user to his TimelinePage component
            this.props.history.push(process.env.PUBLIC_URL + "/timeline/");
        } else {
            // If false: display error message 
            this.setState({ errorLogin: 1 });
        };
    };

    userLogoff = (event) => {
        event.preventDefault();
        this.props.dispatch(logOffUser(this.props.currentUser));
        this.props.history.push(process.env.PUBLIC_URL +"/");
        return null;
    };

    showProfileMenu = () => {
        this.setState({ showMenu: !this.state.showMenu });
    }

    render() { 
        
        // Display a menu if the user is logged in, instead of the normal Login/Signup dialog
        if (this.props.currentUser !== undefined) {
            const currentUser = this.props.currentUser;
            
            // Get the profile image of the user by deconstructing the data from Redux store
            const userProfilePic = this.props.userProfilePic.map(
                (userProfilePicObj) => {
                    if (Object.keys(userProfilePicObj).toString() === currentUser) {
                        const { [currentUser]: userProfilePicPath } = userProfilePicObj;
                        return userProfilePicPath;
                    } else {
                        return null;
                    }
                }).filter(userProfilePicObj => userProfilePicObj !== null);
        
            // Render menu
            return (
                <div id="profileMenu">
                    <img src={require("./img/" + userProfilePic)} alt="User profile" onClick={this.showProfileMenu} />
                    {this.state.showMenu ? (
                        <ul>
                            <li><Link to={process.env.PUBLIC_URL +"/profile/" + this.props.currentUser} onClick={this.showProfileMenu}>My profile</Link></li>
                            <li><Link to={process.env.PUBLIC_URL + "/timeline/"} onClick={this.showProfileMenu}>My timeline</Link></li>
                            <li className="profileMenuDivider"></li>
                            <li><Link to="#" onClick={(event) => this.userLogoff(event)}>Log off</Link></li>
                        </ul>) : null}
                </div>
            );
        }

        // Otherwise, display a login form
        else {
            return (
                <form onSubmit={(event) => this.userLogin(event)} method="post" id="logOnForm">
                    <label htmlFor="loginUsername">Login:</label>
                    <input type="text" name="loginUsername" id="loginUsername" autoComplete="username" onChange={(event) => this.updateState(event)} />

                    <label htmlFor="loginPassword">Password:</label>
                    <input type="password" name="loginPassword" id="loginPassword" autoComplete="new-password" onChange={(event) => this.updateState(event)} />
                    <div className="errMsg" hidden={this.state.errorLogin === -1}>{this.state.errMsgLogin[this.state.errorLogin]}</div>

                    <button>Login</button>
                </form>

            );
        }
       
    }

};


export default withRouter(connect(
    (state) => {
        // Get the username of the currently logged in user (or undefined if none)
        const [loggedInUser] = state.map(userObject => {
            // Take the key from the userObject as it represents the username, store it in userIter
            const userIter = Object.keys(userObject).toString();
            // Deconstruct the userObject object to obtain the value of isLoggedIn key 
            const { [userIter]: { auth: { isLoggedIn: loginStatus } } } = userObject;
            // If loginStatus is true, return the name of the user otherwise return null
            return loginStatus ? userIter : null;
            // Filter out the resulting array to obtain only the logged in user's name
        }).filter(userObject => (userObject !== null));

        // Get user authentication data for login checks
        const userAuthInfo = state.map(userObject => {
            const userIter = Object.keys(userObject).toString();
            const { [userIter]: { auth: { password: userPass } } } = userObject;
            return { [userIter]: userPass };
        });

        // Get profile pictures for different users
        const userProfilePic = state.map(userObject => {
            const userIter = Object.keys(userObject).toString();
            const { [userIter]: { profile: { profilePicture: retUserProfilePic } } } = userObject;
            return { [userIter]: retUserProfilePic };
        })

        return {
            currentUser: loggedInUser,
            userProfilePic: userProfilePic,
            authInfo: userAuthInfo
        }
    }
)(UserLogin));

