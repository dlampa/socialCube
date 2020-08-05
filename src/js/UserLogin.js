import React from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../actions/index';

class UserLogin extends React.Component {
    constructor(props) {
        super(props);

        // Login status will reset when user logs out
        //this.props.logout();

        this.state = {
            username: '',
            password: '', //abc123
            isLoggedin: false,
        };

        this.onSubmit = this.onSubmit.bind(this); //binds key to event listener
        this.onChange = this.onChange.bind(this);
    }

  onChange(event) {
       
        this.setState({ [event.target.name] : event.target.value})
    }
    onSubmit(event) {
        event.preventDefault();

        this.setState({ isLoggedin: true });
        const { username, password } = this.state;
        if (username && password) {
            this.props.dispatch(loginUser(username, password));// Dispatch an action (index/actions); 
        }
    }
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input type="text"
                    name="username"
                    placeholder="User Name"
                    
                    onChange={this.onSubmit}
                />
                


                <input type="password"
                    className="form-control"
                    name="password"
                    placeholder="Password"
            
                    onChange={this.onSubmit}
                />
                <button>Login</button>

            </form >
        );
    }
}

export default UserLogin;
