import React from 'react';
import { connect } from 'react-redux';

import './css/App.css';


// This component receives a username prop from the parent (UserProfilePage)
// Then, the connect() block fetches the data for the requested user from Redux store
// Then this component displays the information stored in the props.


    //in <h1> populate userName props passed in from UserProfilePage file. Use proper syntax.
    //in <p>  populate userDescription, userEmail and userBirthday props passed in from UserProfilePage file. 
    // and use <span> inside each paragraph to seperate content for styling purposes. Use proper syntax.
    //added <a> href element to create a link for the userEmail so that it's clickable and can go straight to email. 
    //should we write props like this?  profile:[userName: "Name Surname", description: "Climate and Environmental Scientist", contact:"email:name.surname@gmail.com" birth: "April 1, 1985"]

class UserProfileSummary extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.state={ }
    };

    render()
    {
        return (
            <section>
                <h1>{this.props.userInfo.userFullName}</h1>
                <p> 
                    <span><a href={"mailto:" + this.props.userInfo.userEmail}>{this.props.userInfo.userEmail}</a></span>
                    <span>{this.props.userInfo.userBirthday.toLocaleDateString()}</span>
                    <img src={require("./img/" + this.props.userInfo.userProfilePicture)} alt="Profile Picture" />
                    <span>{this.props.userInfo.userBriefSummary}</span>
                </p>
            </section>
        ); 
    }
}

export default connect(
    (state, ownProps) => {
        const userProfiles = state.map(userObject => {
            const userIter = Object.keys(userObject).toString();
            const { [userIter]: { profile: userProfileItems } } = userObject;
            return { [userIter]: userProfileItems };
        });

        let userInfo;
        if (ownProps.userProfile !== undefined) {
            const user = ownProps.userProfile;
            // Extract user profile information
            const [{ [user]: userProfileItems }] = userProfiles.filter(userObject => Object.keys(userObject).toString() === user.toString());
            // Save user profile information into the
            userInfo = ({
                userFullName: userProfileItems.fullName,
                userEmail: userProfileItems.emailAddress,
                userBirthday: userProfileItems.birthday,
                userProfilePicture: userProfileItems.profilePicture,
                userBriefSummary: userProfileItems.briefSummary
            });
        }
        return ({
            userInfo: userInfo
            
        });
    }
)(UserProfileSummary);


                
