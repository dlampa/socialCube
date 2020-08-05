/*
import React from './react';
import UserPost from './UserPost';          //however way Muzaffar named his component. Check with him
import { v4 as uuidv4 } from 'uuid';


************IN THIS FILE, RETRIEVE USERPOSTS COMPONENTS FFROM USERPOSTS.JS FILE TO BE PASSED IN 
************CHECK WITH MUZAFFAR TO RETRIEVE USERPOSTS COMPONENT (PASS USER PROP TO THIS COMPONENT IF HE HASN'T STARTED WORKING ON COMPONENT**********
************USE "FOR...OF" OR "SWITCH" STATEMENT TO PASS NUMBER OF POSTS EQUAL TO 5???********************
************how do I retieve random "interests" using an API call???***********************
************CANNOT CODE UNTIL PSEUDO-CODE REVIEW IS DONE. USE CORRECT SYNTAX********************

class UserProfileDetails extends React.Component 
{
    //"fetch" random interests using API call
    //set up component for prop pass in
    
    constructor (props)
    {
        super(props);
        this.state={
            myInterest:[title: "", content:""]  //unsure how to construct for API calls****REVIEW*****
            newUserPost: ""                     //keep track of our new to-do value
            newUserPosts: []                    //keep track of all the UserPosts
        };       
    }

    addUserPost = (event) =>                    //add a new post (see onsubmit in our form below)
    {
        event.preventDefault();                 //stop page from relaoding
        //console.log("Test add post!");        //test that we're submitting!

        const newPost = {                       //set up new post
            uniqueId:uuidv4(),                  //ensure unique ID
            value: this.state.newUserPost       //read current "new UserPost" value
        };
        console.log (newPost);                  //check if new post is working

        const currentUserPosts = [...this.state.UserPosts]; // "..." is a spread operator
        currentUserPosts.push(newPost);                     // add our new post to the clone array

        this.setState( {                        //this is why we made a clone of the User Post list, and update it before running  setState again
            UserPosts: currentUserPosts,        // update UserPosts list
            newUserPost: ""                     // clear the "new userPost" field.
        });
        }

        updatePost (key, value)
        {
            ........TO BE CONTINUED
        }
    }
};
/*
render()
{
    return(
        <section>
        <h1>My Interests</h1>
        <form onSubmit={this.___}>            //depending on what Muzaffar names the component, the idea is to pass props "addUserPost" from UserProp???"
            <label htmlFor = "newPost">       //is this prop defined in my component file or from Muzaffar's file?
            Enter a new post:
            <input
                type ="text"
                name ="newUserPost"
                id="newUserPost"
                required
                value={this.state.newUserPost}          //define props. Props passed from UserPost component???
                onChange={event => this.updateItem( 'newUserPost', event.target.value)} />
            </label>
            <input type="post" value="Add New Post" />
            </form>
            <h2> 5 Recent Posts:</h2>
            <ul>
            {this.state.UserPosts.map (UserPost => (     //we can use .map() to "loop" through our array contents. Great for outputting UserPosts
                <li key={UserPost.uniqueId}
            ))}
        </ul>
        </section>
    });
}
export default UserProfileDetails;
*/