import React from 'react';
import UserProfilePage from './UserProfilePage';

    //in <h1> populate userName props passed in from UserProfilePage file. Use proper syntax.
    //in <p>  populate userDescription, userEmail and userBirthday props passed in from UserProfilePage file. 
    // and use <span> inside each paragraph to seperate content for styling purposes. Use proper syntax.
    //added <a> href element to create a link for the userEmail so that it's clickable and can go straight to email. 
    //should we write props like this?  profile:[userName: "Name Surname", description: "Climate and Environmental Scientist", contact:"email:name.surname@gmail.com" birth: "April 1, 1985"]

class UserProfileSummary extends React.Component 
{
    constructor(props)
    {
        this.state={
            profile:[userName: "", description: "", birth: ""]
        }
    }

    render()
    {
        return( 
            <section>
            this.state.profile.map(profile =>(
            <h1><span class="userName">userName userSurname</span></h1>
            <p><span class="userDescription">"Climate and Environmental Activist"</span></p>
            <p><span class=userEmail><a><href="mailto:{name.surname@gmail.com}"/></span></p>  //retrieve from login???
            <p><span class= "userBirthday">"Bday: April 1, 1985" </span></p>
            </section>  
           
        );
    }
}
export default UserProfileSummary;
    