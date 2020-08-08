import React from 'react';
import UserLogin from './UserLogin';
import Search from './Search';

class SiteNav extends React.Component {
    render() {
        return (
            <header>
                <img src={require ("./img/nav_logo-blue.png")} alt="Site logo" />
                <UserLogin />
                <Search />
            </header>
        );
    }

}

export default SiteNav; 