import React from 'react';
import UserLogin2 from './UserLogin2';
import Search from './Search';


import logo from './img/nav_logo.png';
import './css/App.css';

class SiteNav extends React.Component {
    render() {
        return (
            <header background-color="blue">
                <ul className="nav-list">
                   
                    <li>
                        <img src={logo} alt="Logo" />
                    </li>
                    <li>
                        <UserLogin2 />
                    </li>
                    <li>
                        <Search />
                    </li>
                </ul>

            </header>
        );
    }

}

export default SiteNav; 