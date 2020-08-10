import React from 'react';
import { connect } from 'react-redux';

import './css/App.css';

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
            <section id="userProfile">
                    <img src={require("./img/" + this.props.userInfo.userProfilePicture)} alt="Profile" />
                <div> 
                    <h1>{this.props.userInfo.userFullName}</h1>
                    <h2>{this.props.userProfile}</h2>
                    <div id="briefSummary">{this.props.userInfo.userBriefSummary}</div>
                    <div id="contactInfo">
                        <a href={"mailto:" + this.props.userInfo.userEmail}>{this.props.userInfo.userEmail}</a>
                        <time>{this.props.userInfo.userBirthday.toLocaleDateString()}</time>                    
                    </div>
                </div>
            </section>
        ); 
    }
}

export default connect(
    (state, ownProps) => {
        // Deconstruct store to extract profile information
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
            // Save user profile information into the object userInfo
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


                
