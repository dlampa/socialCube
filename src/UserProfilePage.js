import React, {Compoenent} from "react";
import SiteNav from "./SiteNav";
import UserProfileSummary from './component/UserProfileSummary';
import UserProfileDetail from './component/UserProfileDetail';

//import userLogin2 from './userLogin2'; ?????
//import profilePic from './img/PlaceHolderProfile.png' (image not yet saved for UserProfileSummary page)
//import {Router} from "react-router-dom";

//plan: Redirect to the User Profile page after login validation
//      export router. 


class UserProfilePage extends React.Component {
    constructor(props){
        super(props);

        //define state for userProfileInfo
        this.state = { 
            pageUserId: this.props.match.params.userid
        };
        
    }
   //write in html format the page header and content for UserProfilePage
   //Add a profile image. Image not saved which is why there's ??
   //username should be passed to userProfileSummary and details
    render() {
        return (
            <> 
                <SiteNav />
                <article>
                    <UserProfileSummary userProfile={}/>
                    <UserProfileDetail userProfile={}/>
                </article>
            </>
        );// first section of article is userProfileSummary
    }
}
export default withRouter(connect(
    (state) => {
        const [loggedInUser] = state.map(userObject => {
            const userIter = Object.keys(userObject).toString();
            const { [userInter]: { auth: {isLoggedIn: loginStatus }}} = userObject;
            if (loginStatus) { return userInter };
        }).filter(userObject => (userObject != undefined));
        
        return ({
            currentUser: loggedInUser
        });
    }
))