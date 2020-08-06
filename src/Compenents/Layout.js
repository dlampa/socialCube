import React from "react";
import Header from "./Header";
import Article from "./Article";

//set up page with SiteNav, UserProfileSummary and UserProfileDetails components.
//components UserProfileDetails and UserProfileSummary is set up inside Header
//component SiteNav is set up inside Article

export default class Layout extends React.Component {
    
    render() {
        return (
            <div> 
            <Header />
            <Article/>
            </div>

        );
    }
}