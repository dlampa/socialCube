import React from 'react';
import { connect } from 'react-redux';

// import SiteNav from './SiteNav';
// import UserProfileSummary from './UserProfileSummary';
import UserPosts from './UserPosts';

import "./css/TimelinePage.css";

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
            }

            // Show the results
            return (
                <>
                    <header>
                        {/* <SiteNav /> */}
                    </header>

                    <section>
                        {/* <UserProfileSummary /> */}
                    </section>

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

/* Objectives 

1. Get the username of the actively logged in user DONE
2. If no user is logged in, send the user to the login page
3. If the user is logged in, retrieve a list of all the users. DONE
3.5 Remove logged in user from the list of all users. DONE
4. Select random number of users.
5. Select random number of posts.
6. Pass the posts to UserPosts component, one UserPosts component per user.

allUsers = ["damir", "danielle", "muzaffar", "saida", "spurius", "titus", "mamercus", "faustus", "caius", "cassius"];

how many members in the array allUsers? 10
select a random number between 1 and 10 (or 0 and 9): 3 [0, 5, 7]
for allUsers[randomIndex]: take username and take the random number generated for the postCount and pass to <UserPosts> component.

*/