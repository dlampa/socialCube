import React from 'react';
import { connect } from 'react-redux';

import "./css/TimelinePage.css";

import SiteNav from './SiteNav';
import UserPosts from './UserPosts';


class TimelinePage extends React.Component {

    genRndNum = (numLimit) => Math.floor(Math.random() * (numLimit - 1)) + 1;
    

    render() {
        if (this.props.loggedInUser === undefined) {
            // Redirect to login if loggedInUser is undefined (i.e. noone is logged in)
            this.props.history.push("/");
            return null;
        } else {

            // Get an array of users that excludes the current user
            const otherUsers = [...this.props.allUsers];
            otherUsers.splice(this.props.allUsers.indexOf(this.props.loggedInUser), 1);

            // How many users' posts should we display?
            const randomUserCount = this.genRndNum(otherUsers.length);

            // Which users should be displayed?
            const randomUsers = [];
            // See comment below on the need for this array
            const randomIndexHist = [];

            /*  Loop at least as many times as determined by randomUserCount to generate random users
                based on contents of the otherUsers array */
            for (let randomUser = 1; randomUser <= randomUserCount; randomUser++) {
                const randomIndex = this.genRndNum(otherUsers.length);

                /*  Check if the randomIndex chosen has already been chosen in the earlier random attempt. If so, 
                    increase the number of attempts by one (i.e. reduce the randomUser by 1). If not the case, then
                    add the chosen number to the randomIndexHist array for future comparison */
                if (randomIndexHist.includes(randomIndex)) { randomUser-- } else {
                    randomIndexHist.push(randomIndex)
                    randomUsers.push(otherUsers[randomIndex]);
                }
            }

            // Create an array to store the UserPosts calls which will later be passed back to DOM via return()
            const arrUserPosts = [];
            for (let randomUser of randomUsers) {
                const randomPostCount = this.genRndNum(5);
                arrUserPosts.push(<UserPosts key={randomUsers.indexOf(randomUser)} userName={randomUser} postCount={randomPostCount} />);
                if (randomUsers.indexOf(randomUser) !== (randomUsers.length - 1)) {
                    arrUserPosts.push(<div key={Math.random()} className="postDivider"></div>);
                }
            }

            // Show the results
            return (
                <>
                    <SiteNav />

                    <section id="userTimeline">
                        {[...arrUserPosts]}
                    </section>
                </>
            );

        }
    }
}

export default connect(
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
)(TimelinePage);

