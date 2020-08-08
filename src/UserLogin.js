import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { loginUser, logOffUser } from './actions';

class UserLogin2 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loginUsername: "",
            loginPassword: "",
            errorLogin: -1,

            errMsgLogin: ["User does not exist", "Password incorrect.", "Login/Password fields must be filled in."]
        };
    }

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
            this.props.history.push("/timeline/");
        } else {
            // If false: display error message 
            this.setState({ errorLogin: 1 });
        };
    };

    userLogoff = (event) => {
        event.preventDefault();
        this.props.dispatch(logOffUser(this.props.currentUser));
        this.props.history.push("/");
    };

    showUserProfile = (event) => {
        // this.props.history.push("/profile/" + this.props.currentUser);
        // return <Redirect to={"/profile/" + this.props.currentUser} />
    }

    render() { 
        // If user is logged in, display a log off button
        if (this.props.currentUser) {
            const currentUser = this.props.currentUser;
            const userProfilePic = this.props.userProfilePic.map(
                (userProfilePicObj) => {
                    if (Object.keys(userProfilePicObj).toString() === currentUser) {
                        const { [currentUser]: userProfilePicPath } = userProfilePicObj;
                        return userProfilePicPath;
                    } else {
                        return null;
                    }
                }).filter(userProfilePicObj => userProfilePicObj !== null);
        
            return (
                <form onSubmit={(event) => this.userLogoff(event)} method="post" id="logOffForm">
                    <Link to={"/profile/" + this.props.currentUser}>
                        <img src={require("./img/" + userProfilePic)} alt="User profile" />
                    </Link>
                    <button>Log off</button>
                </form>
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
        const [loggedInUser] = state.map(userObject => {
            const userIter = Object.keys(userObject).toString();
            const { [userIter]: { auth: { isLoggedIn: loginStatus } } } = userObject;
            if (loginStatus) { return userIter } else return undefined;
        }).filter(userObject => (userObject !== undefined));

        const userAuthInfo = state.map(userObject => {
            const userIter = Object.keys(userObject).toString();
            const { [userIter]: { auth: { password: userPass } } } = userObject;
            return { [userIter]: userPass };
        });

        const userProfilePic = state.map(userObject => {
            const userIter = Object.keys(userObject).toString();
            const { [userIter]: { profile: { profilePicture: retUserProfilePic } } } = userObject;
            return { [userIter]: retUserProfilePic };
        })

        return {
            userData: state,
            currentUser: loggedInUser,
            userProfilePic: userProfilePic,
            authInfo: userAuthInfo
        }
    }
)(UserLogin2));

