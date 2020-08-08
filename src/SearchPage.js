import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './css/SearchPage.css'

class SearchPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: ""
        }
    }

    render()     
    {
        const searchResult = this.props.allUsers.filter(userName => null);
        return null;
    }
};

export default withRouter(connect(
    (state) => {
        // Extract all usernames into an array
        const allUsers = state.map(userObject => Object.keys(userObject).toString());

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
            allUsers: allUsers,
            loggedInUser: loggedInUser
        };
    }
)(SearchPage));