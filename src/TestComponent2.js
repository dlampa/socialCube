import React from 'react';

// This is UserPost
class TestComponent2 extends React.Component {
    render()
    {
        // Take the values of various props and display them in a semantically meaningful way
        return (
            <li><img src={require("./img/" + this.props.userInfo.profilePicture)} alt={this.props.userInfo.fullName} className="postProfilePic" />
                <span className="postFullName">{this.props.userInfo.fullName}</span><span className="postUsername">{this.props.userInfo.user}</span>
                <time className="postTimestamp">{this.props.userPost.timestamp.toLocaleDateString()}</time>
                <span className="postText">{this.props.userPost.postText}</span>
            </li>
        )

    }

}

export default TestComponent2;
