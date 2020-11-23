import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addToStore } from './actions';
import { genUserPosts } from './js';

// CSS is shared with UserLogin.js
import './css/UserLogin.css';

class UserSignup extends React.Component
{
    constructor(props) {
        super(props);

        // Collect form information inside the Component state
        this.state = {
            signUpFormUsername: "",
            signUpFormFullName: "",
            signUpFormEmail: "",
            signUpFormPassword1: "",
            signUpFormPassword2: "",
            signUpFormProfileImage: "",
            signUpFormBirthday: "",
            signUpFormOneLineSum: "",
            signUpFormInterests: "",

            /*  Error handling states for the form. Anything above 0 is a reference 
                for the errMsg* array element to be displayed */
            errorSignUpFormUsername: -1,
            errorSignUpFormFullName: -1,
            errorSignUpFormEmail: -1, 
            errorSignUpFormPassword2: -1,
            errorSignUpFormBirthday: -1,

            // Error messages for form fields
            errMsgUsername: ["Username field cannot be empty.",
                "Username is already taken, please choose another",
                "Username must not contain any characters other than letters a-z and numbers 0-9."],
            errMsgFullName: ["Name field cannot be empty."],
            errMsgEmail: ["Email field cannot be empty.", "Email address must be in the correct format."],
            errMsgPassword2: ["Passwords cannot be empty.", "Passwords must match."],
            errMsgBirthday: ["Please enter your birthday.", "You must be older than 13 years to register."]
        }
    }

    /*  This function checks for errors in the user supplied data on the form and returns true if values are 
        suitable for further processing. Used by CreateUser method */
    processUserData = () => {
        // Variable which will contain error state. Allows for processing of all errors before stopping
        let noError = true;

        // Regex expressions, ref. Milestone 1 and https://stackoverflow.com/a/42203701/12802214
        const regexIllegalChars = /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/g;
        const regexValidEmail = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

        /*  This could have been left to the browser to handle, but it is not possible to predict
            what kind of browser the user will be using and the level of checks that will take place */

        // Check if the username is empty
        if (this.state.signUpFormUsername.trim() === "") {
            this.setState({ errorSignUpFormUsername: 0 })
            noError = false;
            
        // Check if the username is unique
        } else if (this.props.users.includes(this.state.signUpFormUsername)) {
            this.setState({ errorSignUpFormUsername: 1 });
            noError = false;

        // Check if username contains illegal characters (see regexIllegalChars, ref. )
        } else if (regexIllegalChars.test(this.state.signUpFormUsername.trim())) {
            this.setState({ errorSignUpFormUsername: 2 });
            noError = false;
        };
        
        if (this.state.signUpFormFullName.trim() === "") {
            this.setState({ errorSignUpFormFullName: 0 });
            noError = false;
        };

        // Check if the email field has been filled out
        if (this.state.signUpFormEmail.trim() === "") {
            this.setState({ errorSignUpFormEmail: 0 });
            noError = false;
        // Check if the email address conforms to expectation
        } else if (!regexValidEmail.test(this.state.signUpFormEmail.trim())) {
            this.setState({ errorSignUpFormEmail: 1 });
            noError = false;
        };

        // Check if the passwords match
        if (this.state.signUpFormPassword1 !== this.state.signUpFormPassword2) {
            this.setState({ errorSignUpFormPassword2: 1 });
            noError = false;
        } else if (this.state.signUpFormPassword1.trim() === "") {
            this.setState({ errorSignUpFormPassword2: 0 });
            noError = false;
        }

        // Check that the birthday has been supplied and that the person is more than 13 years old
        if (this.state.signUpFormBirthday === "") {
            this.setState({ errorSignUpFormBirthday: 0 });
            noError = false;
        } else if ((new Date(Date.now()).valueOf() - new Date(this.state.signUpFormBirthday).valueOf()) < 13 * 365 * 24 * 3600 * 1000) {
            this.setState({ errorSignUpFormBirthday: 1 });
            noError = false;
        }

        return noError;

    };

    newUserRandomPosts = async () => {
        const userPosts = await genUserPosts({postCount: 5});
        await this.setState({ newUserPosts: userPosts });
    };

    createUser = (event) => {
        event.preventDefault();
        const newUsername = this.state.signUpFormUsername.toLowerCase();
        
        // Insert if here to check that processUserData returns true in order to continue

        if (this.processUserData()) {

            // If all checks have been satisfied, create an object that will be sent to the Redux store

            const newUser = {
                [newUsername]:
                {
                    auth: {
                        password: this.state.signUpFormPassword1,
                        isLoggedIn: true // We'll make the user login immediately on account creation
                    },
                    profile: {
                        fullName: this.state.signUpFormFullName,
                        emailAddress: this.state.signUpFormEmail,
                        birthday: new Date(this.state.signUpFormBirthday),
                        profilePicture: "profilepic" + (Math.floor(Math.random() * 9) + 1).toString() + ".jpg",
                        briefSummary: this.state.signUpFormOneLineSum,
                    },
                    posts: this.state.newUserPosts
                }
            };
        
            // Add to store
            this.props.dispatch(addToStore([newUser]));

            /*  Redirect user from the signup page to their TimelinePage
                Ref: https://reactgo.com/react-router-redirection/ */
        
            this.props.history.push(process.env.PUBLIC_URL + "/timeline");

        };

    };
    
    /*  Function used for the form element onChange event - update the state var based on <input> name property and value
        determined from the event */
    updateStateFromEvent = (event) => {
        
        // Update the state variable
        this.setState({ [event.target.name]: event.target.value });

        /*  Clear any errors associated with the state variable. Capitalize first letter of event.target.name to match error state name
            ref: https://dzone.com/articles/capitalize-first-letter-string-javascript */
        this.setState({ ["error" + event.target.name.charAt(0).toUpperCase() + event.target.name.slice(1)]: -1 });
    }

    render()
    {
        // Generate random posts for the new user
        this.newUserRandomPosts();

        return (
            /* Insert a check here to see if there is a currently logged in user before proceeding */
            <form method="post" onSubmit={(event) => this.createUser(event)}>
                
                {/* Username */}
                <label htmlFor="signUpFormUsername">Login:</label>
                <input type="text" name="signUpFormUsername" id="signUpFormUsername" autoComplete="username" onChange={(event) => this.updateStateFromEvent(event)} /*required*/ />
                <span className="errMsg" hidden={this.state.errorSignUpFormUsername === -1 }>{this.state.errMsgUsername[this.state.errorSignUpFormUsername]}</span>

                {/* Full Names */}
                <label htmlFor="signUpFormFullName">Full name:</label>
                <input type="text" name="signUpFormFullName" id="signUpFormFullName" onChange={(event) => this.updateStateFromEvent(event)} /*required*/ />
                <span className="errMsg" hidden={this.state.errorSignUpFormFullName === -1 }>{this.state.errMsgFullName[this.state.errorSignUpFormFullName]}</span>

                {/* email address */}
                <label htmlFor="signUpFormEmail">email address:</label>
                <input type="email" name="signUpFormEmail" id="signUpFormEmail" onChange={(event) => this.updateStateFromEvent(event)} /*required*/ />
                <span className="errMsg" hidden={this.state.errorSignUpFormEmail === -1 }>{this.state.errMsgEmail[this.state.errorSignUpFormEmail]}</span>

                {/* Password entry field, password confirmation field */}
                <label htmlFor="signUpFormPassword1">Choose a password:</label>
                <input type="password" name="signUpFormPassword1" id="signUpFormPassword1" autoComplete="new-password" onChange={(event) => this.updateStateFromEvent(event)} /*required*/ />
                <label htmlFor="signUpFormPassword2">Confirm password:</label>
                <input type="password" name="signUpFormPassword2" id="signUpFormPassword2" autoComplete="new-password" onChange={(event) => this.updateStateFromEvent(event)} /*required*/ />
                <span className="errMsg" hidden={this.state.errorSignUpFormPassword2 === -1 }>{this.state.errMsgPassword2[this.state.errorSignUpFormPassword2]}</span>

                {/* User profile pictures TODO selector
                <img src={ProfileImage1} alt="Avatar 1" /> */}

                {/* Birthday */}
                <label htmlFor="signUpFormBirthday">Birthday:</label>
                <input type="date" name="signUpFormBirthday" id="signUpFormBirthday" onChange={(event) => this.updateStateFromEvent(event)} /*required*/ />
                <span className="errMsg" hidden={this.state.errorSignUpFormBirthday === -1}>{this.state.errMsgBirthday[this.state.errorSignUpFormBirthday]}</span>

                {/* One Line Summary */}
                <label htmlFor="signUpFormOneLineSum">Tell us something about yourself:</label>
                <input type="text" name="signUpFormOneLineSum" id="signUpFormOneLineSum" onChange={(event) => this.updateStateFromEvent(event)} /*required*/ />
               
                {/* Sign Up button */}
                <button>Sign up</button>
                
            </form>      
        );
    }
}

export default withRouter(connect(
    state => {
        /*  Extract the name of the currently logged in user from the store. Uses object deconstructor 
            to get the value of isLoggedIn stored into the var loginStatus. 
            Ref: https://stackoverflow.com/questions/28607451/removing-undefined-values-from-array
         */
        const [loggedInUser] = state.map(userObject => {
            const userIter = Object.keys(userObject).toString();
            const { [userIter]: { auth: { isLoggedIn: loginStatus } } } = userObject;
            if (loginStatus) { return userIter } else { return null };
        }).filter(userObject => (userObject !== null)) 

        const usersList = state.map(userObject => Object.keys(userObject).toString());

        return {
            users: usersList,
            currentUser: loggedInUser
        }
    }
)(UserSignup));
