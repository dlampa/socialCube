import React from 'react';
import { connect } from 'react-redux';


class TestComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: this.props.match.params.userid
        };
    };

    doesUserExist = (user) => {
        const userList = this.props.userData.map(userObject => Object.keys(userObject).toString());
        return userList.indexOf(user) > -1 ? true : false;
    };

    /* This function iterates through the Redux store and: 
         1. checks if the user exists 
         2. if user exists, compares passwords. Match returns true, mismatch returns false 
         3. if user does not exist, returns null */
    isPasswordValid = (user, password) => {
        if (this.doesUserExist(user)) {
            const [isPasswordValid] = this.props.userData.map(userObject => {
                const userIter = Object.keys(userObject).toString();
                const { [userIter]: { auth: { password: dbPass } } } = userObject;
                if (userIter === user) { return password === dbPass };
            })
            return isPasswordValid;
        } else {
            return null;
        }
    };

    // this func uses userAuthInfo from the props instead of userData
    isPasswordValid2 = (user, password) => {
        if (this.doesUserExist(user)) {
            const [isPasswordValid] = this.props.userAuthInfo.map(userAuthObject => {
                if (Object.keys(userAuthObject).toString() === user) { return (userAuthObject[user] === password); }
            })
            return isPasswordValid;
        } else {
            return null;
        }
    };

    // Get all posts for the user
    getUserPosts = (user, count) => {
        if (this.doesUserExist(user)) {

        }
    }

    render() {
        
        return (
            <>
                <h1>{this.props.currentUser != null ? this.props.currentUser + "is currently logged in" : "noone is logged in"}</h1>
                <h1>{this.doesUserExist("damir") ? "Damir Exists" : "Something's wrong"}</h1>
                <h1>{this.isPasswordValid2("damir", "abc123") ? "Password is correct" : "Password is incorrect"}</h1>
            </>
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
        
        const userPosts = state.map(userObject => {
            const userIter = Object.keys(userObject).toString();
            const { [userIter]: { posts: userPosts } } = userObject;
        });
        
        return {
            userData: state,
            users: state.map(userObject => Object.keys(userObject).toString()),
            currentUser: loggedInUser,
            userAuthInfo: userAuthInfo
        }
    }
)(TestComponent);
