import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './css/SearchPage.css';

import SiteNav from './SiteNav';
import UserPosts from './UserPosts';


class SearchPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: ""
        }
    }

    render()
    {
        if (this.props.loggedInUser === undefined) {
            this.props.history.push(process.env.PUBLIC_URL + "/");
            return null;
        } else {
            const searchResult = this.props.allUsers.filter(userName => {
                // Escape the search term to prevent search method not being able to convert the expression to valid regex
                const searchRetVal = userName.search(escape(this.props.match.params.searchTerm));
                return searchRetVal !== -1;
            });

            const searchResultArray = [];
            for (let searchResultItem of searchResult) {
                searchResultArray.push(<UserPosts key={searchResult.indexOf(searchResultItem)} userName={searchResultItem} postCount="1" />)
            }

            return (
                <main id="searchPage">
                    <SiteNav />
                    <section id="searchResultHeading">
                        <h2>Found {searchResultArray.length} results for "{this.props.match.params.searchTerm}"</h2>
                    </section>
                    <section id="searchResults">
                        {[...searchResultArray]}
                    </section>
                </main>
            )
        }
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