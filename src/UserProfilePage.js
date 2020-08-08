import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import "./css/UserProfilePage.css";

import SiteNav from './SiteNav';
import UserProfileSummary from './UserProfileSummary';
import UserPosts from './UserPosts';


class UserProfilePage extends React.Component {
    constructor(props){
        super(props);

        //define state for userProfileInfo
        this.state = { 
            pageUserId: this.props.match.params.userid
        };
        
    }
    render() {
        // Check if there is an actively logged in user 
        if (this.props.currentUser !== undefined) {
            // If true: display the profile page for the user in the address request
            return (
                <>
                    <SiteNav />
                    <article>
                        <UserProfileSummary userProfile={this.state.pageUserId} />
                        <section>
                            <UserPosts userName={this.state.pageUserId} postCount="5" />
                        </section>
                    </article>
                </>
            );
        } else {
            // If false: send the user to the LoginPage (App.js or "/" )
            this.props.history.push("/");
            return null;
        }
    }
}
export default withRouter(connect(
    (state) => {
        const [loggedInUser] = state.map(userObject => {
            // Take the key from the userObject as it represents the username, store it in userIter
            const userIter = Object.keys(userObject).toString();
            // Deconstruct the userObject object to obtain the value of isLoggedIn key 
            const { [userIter]: { auth: { isLoggedIn: loginStatus } } } = userObject;
            // If loginStatus is true, return the name of the user otherwise return null
            return loginStatus ? userIter : null;
            // Filter out the resulting array to obtain only the logged in user's name
        }).filter(userObject => (userObject !== null));
        
        return ({
            currentUser: loggedInUser
        });
    }
)(UserProfilePage));