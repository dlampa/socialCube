import React from 'react';
import UserLogin2 from './UserLogin2';
//import Search from './Search';

import './css/App.css';

class SiteNav extends React.Component {
    render() {
        return (
            <header background-color="blue">
                <ul className="nav-list">
                   
                    <li>
                        <img src={require ("./img/nav_logo.png")} alt="navigation-logo" />
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