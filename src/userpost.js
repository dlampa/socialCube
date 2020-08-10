import React from 'react';
import { Link } from 'react-router-dom';

import './css/UserPost.css';

class UserPost extends React.Component
{
    render() {
        /*  Take the values of various props and display them in a semantically 
            meaningful way. Using the process.env.PUBLIC_URL value in links based on 
            https://stackoverflow.com/questions/54985914/get-react-root-url-path */
        
        return (
            <li><div>
                <Link to={process.env.PUBLIC_URL + "/profile/" + this.props.userInfo.user}><img src={require("./img/" + this.props.userInfo.profilePicture)} alt={this.props.userInfo.fullName} className="postProfilePic" /></Link>
                    <div>
                    <Link className="postFullName" to={process.env.PUBLIC_URL + "/profile/" + this.props.userInfo.user}>{this.props.userInfo.fullName}</Link>
                    <Link className="postUsername" to={process.env.PUBLIC_URL + "/profile/" + this.props.userInfo.user}>{this.props.userInfo.user}</Link>
                    </div>
                </div>
                <span className="postText">{this.props.userPost.postText}</span>
                <time className="postTimestamp">{this.props.userPost.timestamp.toLocaleDateString()}</time>
            </li>
        );
    }
}


export default UserPost;
