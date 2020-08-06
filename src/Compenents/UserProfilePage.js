import React, {Compoenent} from "react";
import SiteNav from "./SiteNav";
import UserProfileSummary from './component/UserProfileSummary';
import UserProfileDetails from './component/UserProfileDetails';
import { v4 as uuidv4 } from 'uuid';
//import userLogin2 from './userLogin2'; ?????
//import profilePic from './img/PlaceHolderProfile.png' (image not yet saved for UserProfileSummary page)
//import {Router} from "react-router-dom";

//plan: Redirect to the User Profile page after login validation
//      export router. 


class UserProfilePage extends React.Component {
    constructor(props){
        super(props);
//define props for userProfileInfo
        this.state = { 
            userFullName: "Name Surname", 
            userDescription: "Climate and Environmental Scientist",
            userContact: "",
            userBirthday: "",
            userInterest: "" //fetch random interest defined in UserProfileDetail   
        };
        //add NewSearch
        addSearch = (event) =>
        {
            event.preventDefault()
            //set up new search
            const newSearch = {
                uniqueId: uuIdv4(),
                value: this.state.newSearch
            };
            console.log(newSearch)
        }
    }
   //write in html format the page header and content for UserProfilePage
   //Add a profile image. Image not saved which is why there's ??
   //username should be passed to userProfileSummary and details
    render() {
        return (
            <div> 
                <header class="SiteNav">
                    <form onSubmit = {this.addSearch}>  
                    <label htmlFor="search">search:</label>
                    <input
                        type="text"
                        name="search"
                        id="search"
                        required
                        value={this.state.newSearch}/>
                    <button type="submit" value="search"/>
                    </form>
                <img class="logo" id="logo" src="img/_______???" alt="App Logo"/>
                </header>
    
                <article>
                    <div> 
                        <p>{this.state.userFullName}</p>
                        <p>{this.state.userDescription}</p>
                        <p>{this.state.userContact}</p>
                        <p>{this.state.userContact}</p>
                    </div>


                </article>
            </div>
        );// first section of article is userProfileSummary
    }
}
export default withRouter(connect(
    (state) => {
        //[{ damir: {auth: {isLoggedIn: true} }...}, { danielle: ...}, {saida:...}]
       // .map:
        //[{ damir}, {undefined}, {undefined }...]
       // .filter:
       // [{ damir }]

        const [loggedInUser] = state.map(userObject => {
            const userIter = Object.keys(userObject).toString();
            const { [userInter]: { auth: {isLoggedIn: loginStatus }}} = userObject;
            if (loginStatus) { return userInter };
        }).filter(userObject => (userObject != undefined));

    }
))