import React from 'react';
import { Link } from 'react-router-dom';

class UserPost extends React.Component
{
    render() {
        // Take the values of various props and display them in a semantically meaningful way
        return (
            <li><div>
                    <Link to={"/profile/" + this.props.userInfo.user}><img src={require("./img/" + this.props.userInfo.profilePicture)} alt={this.props.userInfo.fullName} className="postProfilePic" /></Link>
                    <div>
                    <Link className="postFullName" to={"/profile/" + this.props.userInfo.user}>{this.props.userInfo.fullName}</Link>
                    <Link className="postUsername"to={"/profile/" + this.props.userInfo.user}>{this.props.userInfo.user}</Link>
                    </div>
                </div>
                <span className="postText">{this.props.userPost.postText}</span>
                <time className="postTimestamp">{this.props.userPost.timestamp.toLocaleDateString()}</time>
            </li>
        );
    }
}


export default UserPost;
