import React from 'react';
import { withRouter } from 'react-router-dom';

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
        if (this.state.searchTerm.trim() !== "") {
            this.props.history.push("/search/" + this.state.searchTerm.trim());
        }
        return null;
    };

    updateSearchState = (event) => {
        // Use a regular expression to find irregular characters
        //const regexIllegalChars = /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/g;

        // Replace irregular characters with an empty string
        // const cleanSearchTerm = event.target.value.replace(regexIllegalChars, "");
        

        // Save value to state (which will be displayed inside the Search box as well)
        this.setState({ searchTerm: event.target.value });
    }

    render()
    {
        return (
            <form onSubmit={(event) => this.submitSearch(event)} method="post">
                <label htmlFor="searchTermInput" className="sr-only">Search:</label>
                <input type="search" name="searchTermInput" id="searchTermInput" placeholder="Search for users..." value={this.state.searchTerm} onChange={(event) => this.updateSearchState(event)} />
            </form>
        );
    }
}

export default withRouter(Search);