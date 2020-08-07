import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import TestComponent2 from './TestComponent2';
import TestComponent3 from './TestComponent3';

class TestComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: this.props.match.params.userid
        };
    };

    doesUserExist = (user) => {
        const userList = this.props.userData.map(userObject => Object.keys(userObject).toString());
        return userList.indexOf(user) > -1;
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
        //const userInfo = this.getUserProfile(this.props.loggedInUser); // use this.props.profileUser (as a prop passed down from parent component)
        return (
            <>
                <h1>{this.props.currentUser === this.state.userId ? "We have a user match" : "No user match"}</h1>
                <h1>{this.props.currentUser} | {this.props.currentUser != null ? this.props.currentUser + " is currently logged in" : "noone is logged in"}</h1>

                    <section>
                        <h1>{this.props.userInfo.userFullName}</h1>
                        <p>
                            <span className="profileSummary">{this.props.userInfo.userBriefSummary}</span>
                            <span className="profileEmail">{this.props.userInfo.userEmail}</span>
                            <span className="profileBirthday">{this.props.userInfo.userBirthday.toLocaleDateString()}</span>
                        </p>
                </section>
                
                <section>
                    <ul>
                        {this.props.userPosts.damir.map(userPostData => {
                            //return (<TestComponent2 userInfo={this.props.userInfo} userPost={userPostData} />);
                        })}
                        {/* {this.genUserPosts("damir")} */}
                    </ul>
                </section>


                <section>
                    <TestComponent3 user="damir" postCount="3" />
                </section>

                {/* TimeLine page demo follows 
                    This page should show all the posts from a random selection of the users, except user's own posts.
                */}

                <section>
                    { /* Randomize selection of posts, based on length of the array of all usernames */
                    const randPosterCount = Math.floor(Math.random() * (this.props.users.length - 1) + 1 );

                        

                 }
                </section>

            </>
        );

    }
}
export default withRouter(connect(
    (state, ownProps) => {
        /*  Extract the name of the currently logged in user from the store. Uses object deconstructor 
            to get the value of isLoggedIn stored into the var loginStatus. 
            Ref: https://stackoverflow.com/questions/28607451/removing-undefined-values-from-array
         */
        const [loggedInUser] = state.map(userObject => {
            const userIter = Object.keys(userObject).toString();
            const { [userIter]: { auth: { isLoggedIn: loginStatus } } } = userObject;
            if (loginStatus) { return userIter } else { return null };
        }).filter(userObject => (userObject !== null ));
        

        const userAuthInfo = state.map(userObject => {
            const userIter = Object.keys(userObject).toString();
            const { [userIter]: { auth: { password: userPass } } } = userObject;
            return { [userIter]: userPass };
        });

        const [userPosts] = state.map(userObject => {
            const userIter = Object.keys(userObject).toString();
            const { [userIter]: { posts: userPostItems } } = userObject;
            return { [userIter]: userPostItems };
        });
        
        const userProfiles = state.map(userObject => {
            const userIter = Object.keys(userObject).toString();
            const { [userIter]: { profile: userProfileItems } } = userObject;
            return { [userIter]: userProfileItems };
        });

        let userInfo;
        if (ownProps.match.params.userid !== undefined) {
            const user = ownProps.match.params.userid;
            // Extract user profile information
            const [{ [user]: userProfileItems }] = userProfiles.filter(userObject => Object.keys(userObject).toString() === user.toString());
            // Save user profile information into the 
            userInfo = ({
                username: user,
                userFullName: userProfileItems.fullName,
                userEmail: userProfileItems.emailAddress,
                userBirthday: userProfileItems.birthday,
                userProfilePicture: userProfileItems.profilePicture,
                userBriefSummary: userProfileItems.briefSummary
            });
        }

        return {
            userData: state,
            users: state.map(userObject => Object.keys(userObject).toString()),
            currentUser: loggedInUser,
            userAuthInfo: userAuthInfo,
            userPosts: userPosts,
            userProfiles: userProfiles,
            userInfo: userInfo
        }
    }
)(TestComponent));
