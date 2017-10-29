import React from 'react';
import {
    Card,
    Label,
    Button,
    Grid,
    Header,
    Dropdown,
    Select,
    Input
} from 'semantic-ui-react';

class GameDirectory extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchMode: 'name',
            searchQuery: '',
            gameData: []        //Games Here.
        };

        this.searchRequested = this.searchRequested.bind(this);
        this.handleSearchQuery = this.handleSearchQuery.bind(this);
    }

    /**
     * Called before component is displayed
     */
    async componentWillMount() {
        console.log("Loading Relevant Games");
    }

    /**
     * Handle Search Query 
     * @param {*} e 
     */
    handleSearchQuery(e){
        let str = e.target.value;
        if(str.indexOf('tag:')== -1){
            console.log("Searching by name");
            this.setState({
                searchMode: 'name',
                searchQuery: str
            });
        }else{
            console.log("Searching by tag");
            this.setState({
                searchMode: 'tag',
                searchQuery: str.substr(str.indexOf('tag:'), str.Lenth - 1)
            });
        }
    }

    /**
     * Search Games. 
     */
    searchRequested(){
        let mode = this.state.searchMode;
        let query = this.state.searchQuery;
        console.log("Retreiving Games with Mode: " + mode + " Query: " + query);
    }

    render() {
        return (
            <div>
                <br />
                <br />
                <br />
                <br />
                <h2>Game Directory</h2>
                <Grid inverted padded columns={5}>
                    <Grid.Column width={1} />
                    <Grid.Column width={11}>
                        <Card fluid>
                            <Card.Content>
                                Test
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <Card fluid>
                            <Card.Content>
                                <Header as="h3" dividing>Filter Options</Header>
                                <Input fluid type="text" size="small" action={{icon: 'search', onClick: this.searchRequested}} onChange={this.handleSearchQuery}/>
                                <div>
                                    <Label basic size="large">Categories</Label>
                                </div>
                                <div>
                                    <Label basic size="large">Competitions</Label>
                                </div>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default GameDirectory;