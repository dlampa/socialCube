import React from 'react';
import { connect } from 'react-redux';

class TestComponent2 extends React.Component {
    render()
    {
        return (
            <li><img src={require("./img/" + this.props.userInfo.userProfilePicture)} alt={this.props.userInfo.userFullName} className="postProfilePic" />
                <span className="postFullName">{this.props.userInfo.userFullName}</span><span className="postUsername">{this.props.userInfo.username}</span>
                <time className="postTimestamp">{this.props.userPost.timestamp.toLocaleDateString()}</time>
                <span className="postText">{this.props.userPost.postText}</span>
            </li>
        )

    }

}

export default connect(
    (state, ownProps) => {
        
        return {

        };
    }
)(TestComponent2);
