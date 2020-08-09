import React from 'react';
import UserLogin from './UserLogin';
import Search from './Search';

import './css/SiteNav.css';

class SiteNav extends React.Component {
    render() {
        return (
            <header>
                <img src={require ("./img/nav_logo-blue.png")} alt="Site logo" />
                <Search />
                <UserLogin />
            </header>
        );
    }

}

export default SiteNav; 