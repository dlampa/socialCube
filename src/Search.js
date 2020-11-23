import React from 'react';
import { withRouter } from 'react-router-dom';

import './css/Search.css';

class Search extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            searchTerm: ""
        }
    }

    submitSearch = (event) => {
        event.preventDefault();
        // Redirect user if the search box contains something meaningful
        if (this.state.searchTerm.trim() !== "") {
            // Use trim to remove extra spaces
            this.props.history.push(process.env.PUBLIC_URL + "/search/" + this.state.searchTerm.trim());
        }
        return null;
    };

    updateSearchState = (event) => {
        // Save value to state (which will be displayed inside the Search box as well)
        this.setState({ searchTerm: event.target.value });
    }

    render()
    {
        return (
            <form id="searchForm" onSubmit={(event) => this.submitSearch(event)} method="post">
                <label htmlFor="searchTermInput" className="sr-only">Search:</label>
                <input type="search" name="searchTermInput" id="searchTermInput" placeholder="Search for users..." value={this.state.searchTerm} onChange={(event) => this.updateSearchState(event)} />
            </form>
        );
    }
}

export default withRouter(Search);