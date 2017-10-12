import React from 'react';
import { Loader } from 'semantic-ui-react';
class SearchDirectory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };

    }
    componentDidUpdate(nextProps, nextState) {
        /*if (this.props.query[0]){
            this.setState({
                loading: false
            });
        }*/
    }

    render() {
        const {loading} = this.state;
        return (
            <div>
                <h2>Search Directory</h2>
                <h5>Query for {this.props.match.params.searchQuery}</h5>
                <Loader inverted size="big" active={this.state.loading}/>
            </div>
        );
    }
}

export default SearchDirectory;