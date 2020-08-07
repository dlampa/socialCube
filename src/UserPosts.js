import React from 'react';
import { connect } from 'react-redux';

class UserPosts extends React.Component
{
    constructor(props) {
        super ( props );
        this.state = {
            userProfile: ' ',
            userPosts: ' ',
            existUser: ' ',
            userId: ' ',
        };
    }

    render(
        const postDisplay = { this.props.userPosts };

        const postList = [];

        for ( let postCount = 0; postCount < postList; postCount++)
        {
            const post = this.props.postCount;
            postList.push(userPosts);
        }
    )
    {
        return(
            <section>
            <h1>{ this.props.existUser === this.props.userId }</h1>
            <h1> { this.props.userFullName }</h1>
            <section>
                <ul>
                    {...postList}
                </ul>
            </section>
            </section>
        )
    }
}

export default connect(
    (state, props)
    const userInfo = state.map(userObject => {
        const userArray = Object.keys(userObject).toString();
        if (userArray == user)
            const { userArray : userProfile} = userObject;
            const { userArray : userPosts } = userObject;

            return { userArray : userProfile, userPosts};
    }
    else {
        return {
            userProfile,
            userPosts
        };
    }
    })
