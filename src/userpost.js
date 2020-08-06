import React from 'react';
import { connect } from 'react-redux';

class UserPost extends React.Component
{
    constructor(props) {
        super ( props );
        this.state = {
            post1: ' ',
            post2: ' ',
            post3: ' ',
            post4: ' ',
            post5: ' ',
            name: ' ',
        };
    }

    render()
    {
        return(
            <li>
                <h3>
                <label for="Post 1">Post 1</label>
                    <img src="img/profilepic1.jpg" alt="Avatar 1" />
                    <span>User Full Name</span>
                    <span>User Name</span>
                    <time datetime="2020-08-05 10:31:33"></time>
                </h3>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                   Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                   when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>

                <h3>
                <label for="Post 2">Post 2</label>
                    <img src="img/profilepic1.jpg" alt="Avatar 1" />
                    <span>User Full Name</span>
                    <span>User Name</span>
                    <time datetime="2020-08-05 10:31:33"></time>
                </h3>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                   Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                   when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>

                <h3>
                <label for="Post 3">Post 3</label>
                    <img src="img/profilepic1.jpg" alt="Avatar 1" />
                    <span>User Full Name</span>
                    <span>User Name</span>
                    <time datetime="2020-08-05 10:31:33"></time>
                </h3>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                   Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                   when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>

                <h3>
                <label for="Post 4">Post 4</label>
                    <img src="img/profilepic1.jpg" alt="Avatar 1" />
                    <span>User Full Name</span>
                    <span>User Name</span>
                    <time datetime="2020-08-05 10:31:33"></time>
                </h3>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                   Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                   when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>

                <h3>
                <label for="Post 5">Post 5</label>
                    <img src="img/profilepic1.jpg" alt="Avatar 1" />
                    <span>User Full Name</span>
                    <span>User Name</span>
                    <time datetime="2020-08-05 10:31:33"></time>
                </h3>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                   Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                   when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>
            </li>

        )
    }
}

export default UserPost;