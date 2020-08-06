import React from "react";
import UserProfileSummary from './component/UserProfileSummary'
import UserProfileDetails from './component/UserProfileDetails'

//since component userProfileComponent and userProfileSummary are set up in their files, the plan is to retrieve those JSX elements in this file
//unsure what syntax to use to retrieve mutiple components

class Article extends React.Component {
   
    render() {
        return (
            <article>
               <UserProfileSummary/>
               <UserProfileDetails/>
            </article>
        );
    }
}
export default Article;