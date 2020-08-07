import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import "./css/UserProfilePage.css";

import UserProfileSummary from './UserProfileSummary';

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
        //if (this.props.loggedInUser !== undefined) {
            // If true: display the profile page for the user in the address request
            return (
                <>
                    {<SiteNav />}
                    <article>
                        <UserProfileSummary userProfile={this.state.pageUserId}/>
                    </article>
                </>
            );
        //} else {
            // If false: send the user to the LoginPage (App.js or "/" )
        //    this.props.history.push("/");
        //    return null;
        //}
    }
}
export default withRouter(connect(
    (state) => {
        const [loggedInUser] = state.map(userObject => {
            const userIter = Object.keys(userObject).toString();
            const { [userIter]: { auth: { isLoggedIn: loginStatus } } } = userObject;
            if (loginStatus) { return userIter };
        }).filter(userObject => (userObject != undefined));
        
        return ({
            currentUser: loggedInUser
        });
    }
)(UserProfilePage));