import React from 'react';
import { connect } from 'react-redux';
import './css/UserSignup.css';



class UserSignup extends React.Component
{
    constructor(props) {
        super(props);

        // Collect form information inside the Component state
        this.state = {
            signUpFormUserName: "",
            signUpFormFullName: "",
            signUpFormEmail: "",
            signUpFormPassword1: "",
            signUpFormPassword2: "",
            signUpFormProfileImage: "",
            signUpFormBirthday: "",
            signUpFormOneLineSum: "",
            signUpFormInterests: ""
        }
    }
    processUserData = (event) => {

        // Checking if all parameters are correct is prudent since we do not know what kind of browser
        // the user is using to access the site. 
        
        // Check if the username is unique
        //if (doesUserExist(this.state.signUpFormUserName)) {
                
        //}

        // Check that FullName field has been filled out
        
        // Check if the passwords match
        
        // Check that the birthday has been supplied and that the person is more than 13 years old
    
        // Summary? Interests?

    };

    createUser = (event) => {
        event.preventDefault();
        

        // If all checks have been satisfied, create an object that will be sent to the Redux store

        // Redirect user from the signup page to their TimelinePage


    };
    
    /*  Function used for the form element onChange event - update the state var based on <input> name property and value
        determined from the event */
    updateState = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render()
    {
        return (
            /* Insert a check here to see if there is a currently logged in user before proceeding */
            <form method="post" onSubmit={(event) => this.createUser(event)}>
                
                {/* Username */}
                <label htmlFor="signUpFormUsername">Login:</label>
                <input type="text" name="signUpFormUsername" id="signUpFormUserName" onChange={(event) => this.updateState(event)} required />

                {/* Full Names */}
                <label htmlFor="signUpFormFullName">Full name:</label>
                <input type="text" name="signUpFormFullName" id="signUpFormFullName" onChange={(event) => this.updateState(event)} required />

                {/* email address */}
                <label htmlFor="signUpFormEmail">Valid email address:</label>
                <input type="email" name="signUpFormEmail" id="signUpFormEmail" onChange={(event) => this.updateState(event)} required />

                {/* Password entry field, password confirmation field */}
                <label htmlFor="signUpFormPassword1">Choose a password:</label>
                <input type="password" name="signUpFormPassword1" id="signUpFormPassword1" onChange={(event) => this.updateState(event)} required />
                <label htmlFor="signUpFormPassword2">Confirm password:</label>
                <input type="password" name="signUpFormPassword2" id="signUpFormPassword2" onChange={(event) => this.updateState(event)} required />

                {/* User profile pictures TODO selector
                <img src={ProfileImage1} alt="Avatar 1" /> */}

                {/* Birthday */}
                <label htmlFor="signUpFormBirthday">Birthday:</label>
                <input type="date" name="signUpFormBirthday" id="signUpFormBirthday" onChange={(event) => this.updateState(event)} required />

                {/* One Line Summary */}
                <label htmlFor="signUpFormOneLineSum">Your one line summary:</label>
                <input type="text" name="signUpFormOneLineSum" id="signUpFormOneLineSum" onChange={(event) => this.updateState(event)} required />

                {/* Interests */}
                <label htmlFor="signUpFormInterests">Tell us something about your interests:</label>
                <input type="text" name="signUpFormInterests" id="signUpFormInterests" onChange={(event) => this.updateState(event)} required />
               
                {/* Sign Up button */}
                <button>Sign up</button>
                <button>Sign in</button>
                
            </form>      
        );
    }
}

export default connect(
    state => {
        /*  Extract the name of the currently logged in user from the store. Uses object deconstructor 
            to get the value of isLoggedIn stored into the var loginStatus. 
         */
        const [loggedInUser] =
            state.map(userObject => {
                const userIter = Object.keys(userObject).toString();
                const { [userIter]: { auth: { isLoggedIn: loginStatus } } } = userObject;
                if (loginStatus) { return userIter };
            });

        const userAuthInfo = state.map(userObject => {
            const userIter = Object.keys(userObject).toString();
            const { [userIter]: { auth: { password: userPass } } } = userObject;
            return { [userIter]: userPass };
        });

        const usersList = state.map(userObject => Object.keys(userObject).toString());

        return {
            userData: state,
            users: usersList,
            currentUser: loggedInUser,
            userAuthInfo: userAuthInfo
        }
    }
)(UserSignup);
