import React from 'react';
import { connect } from 'react-redux';


class TestComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: this.props.match.params.userid
        };
    }
    testFunction = () => {  console.log(this.props); console.log(this.props.match)}
    render() {
        
        return (
            <>
                {this.testFunction()}
                <h1>Welcome {this.state.userId}</h1>  
            </>
        );

    }
}

export default connect(
    state => { return { userData: state } }
)(TestComponent);
