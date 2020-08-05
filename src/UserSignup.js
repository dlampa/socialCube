import React from 'react';
import { connect } from 'react-redux';

class UserSignup extends React.Component
{
    processUserForm = (event) => {

    }

    render()
    {
        return (
            <form>
                {/* Username */}
                <label for="signUpFormUsername">Login:</label>
                <input type="text" name="signUpFormUsername" id="signUpFormUserName" required />

                {/* Full Names */}
                <label for="signUpFormFullName">Full name:</label>
                <input type="text" name="signUpFormFullName" id="signUpFormFullName" required />

                {/* email address */}
                <label for="signUpFormEmail">Valid email address:</label>
                <input type="email" name="signUpFormEmail" id="signUpFormEmail" required />

                {/* Password entry field, password confirmation field */}
                <label for="signUpFormPassword1">Choose a password:</label>
                <input type="password" name="signUpFormPassword1" id="signUpFormPassword1" required />
                <label for="signUpFormPassword2">Confirm password:</label>
                <input type="password" name="signUpFormPassword2" id="signUpFormPassword2" required />

                {/* User profile pictures */}
                <img src="img/profilepic1.jpg" alt="Avatar 1" />

                {/* Birthday */}
                <label for="signUpFormBirthday">Birthday:</label>
                <input type="date" name="signUpFormBirthday" id="signUpFormBirthday" required />

                {/* One Line Summary */}
                <label for="signUpFormOneLineSum">Your one line summary:</label>
                <input type="text" name="signUpFormOneLineSum" id="signUpFormOneLineSum" required />

                {/* Interests */}
                <label for="signUpFormInterests">Tell us something about your interests:</label>
                <input type="text" name="signUpFormInterests" id="signUpFormInterests" required />
               
                {/* Sign Up button */}
                <button>Sign up</button>
                <button>Sign in</button>
                
            </form>      
        );
    }
}

export default connect()(UserSignup);