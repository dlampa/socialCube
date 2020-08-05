import React from 'react';
import { connect } from 'react-redux';

class UserLogin extends React.Component 
{
    constructor(props) {
        super(props);
        this.state = {
            userName: ' ',
            password: 'abc123 ',
            errorMsg: 'Your username or password is incorrect, please try again',
         };

         this.onSubmit = this.onSubmit.bind //bind the this keyword to the event handler onSubmit
    }
    //validInput()
    onSubmit(event) {
        event.preventDefault();

    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                
                
                <input type="text"
                    className="form-control"
                    name="username"
                    placeholder="User Name"
                    //value={username}
                   // onChange={this.handleChange} 
                   />

                
                <input type="password"
                    className="form-control"
                    name="password"
                    placeholder="Password"
                    //value={password}
                    //onChange={this.handleChange} 
                    />
<button>Login</button> 

            </form >
        );
    }
}

export default UserLogin;
