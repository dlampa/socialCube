import React from 'react';
import { Link } from 'react-router-dom';

class UserPost extends React.Component
{
    render() {
        // Take the values of various props and display them in a semantically meaningful way
        return (
            <li><Link to={"/profile/" + this.props.userInfo.user}><img src={require("./img/" + this.props.userInfo.profilePicture)} alt={this.props.userInfo.fullName} className="postProfilePic" /></Link>
                <Link to={"/profile/" + this.props.userInfo.user}><span className="postFullName">{this.props.userInfo.fullName}</span></Link>
                <Link to={"/profile/" + this.props.userInfo.user}><span className="postUsername">{this.props.userInfo.user}</span></Link>
                <time className="postTimestamp">{this.props.userPost.timestamp.toLocaleDateString()}</time>
                <span className="postText">{this.props.userPost.postText}</span>
            </li>
        );
    }
}


export default UserPost;
