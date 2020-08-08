import React from 'react';

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
        // Check if the searchTerm contains any whitespace/symbols/etc.
        
        // Redirect user if the search box contains something meaningful
        this.props.history.push("/search/" + this.state.searchTerm);
        return null;
    };

    updateSearchState = (event) => {
        this.setState({ searchTerm: event.target.value });
    }

    render()
    {
        return (
            <form onSubmit={(event) => this.submitSearch(event)} method="post">
                <label htmlFor="searchTermInput" className="sr-only">Search:</label>
                <input type="search" name="searchTermInput" id="searchTermInput" placeholder="Search for users..." onChange={(event) => this.updateSearchState(event)} />
            </form>
        );
    }
}

export default Search;