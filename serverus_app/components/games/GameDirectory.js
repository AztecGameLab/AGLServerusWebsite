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
import { Image as CloudImage, CloudinaryContext } from 'cloudinary-react';
import { Link } from 'react-router-dom';
import style from './gameDirectoryStyle.css';

export class GameDirectory extends React.Component {
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
                <br />
                <br />
                <h1 style = {{textAlign: 'center'}}>Game Directory</h1>
                <hr/>
                <Grid centered inverted padded columns={4} >
                    <CloudinaryContext cloudName='aztecgamelab-com'>
                        <Grid.Column as={Link} to={"/g/-KxiO8LO1Har4zNHnzBB"}>
                            <CloudImage className = 'gameDirectoryImage' publicId = "ArticlePictures/gt6zyjswiqpyu726xmwr.png">
                            </CloudImage>
                        </Grid.Column>
                    <hr/>
                        <Grid.Column as={Link} to={"/g/-Kxiafi_0ie7NgAp3UCx"}>
                            <CloudImage className = 'gameDirectoryImage' publicId = "ArticlePictures/kcmpktylpituaeufdjlh.png" >
                        </CloudImage>
                        </Grid.Column>
                    <hr/>
                        <Grid.Column as={Link} to={"/g/-KxkiEsNvWBOgr1s-2uq"}>
                            <CloudImage className = 'gameDirectoryImage' publicId = "ArticlePictures/txppshioq8t3cptpvbis.png" >
                            </CloudImage>
                        </Grid.Column>
                    <hr/>
                        <Grid.Column as={Link} to={"/g/-KxkpO08o5tf2aWKOFqP"}>
                            <CloudImage className = 'gameDirectoryImage' publicId="ArticlePictures/vhbegowxjuz8blimpir3.png" >
                            </CloudImage>
                        </Grid.Column>
                    <hr/>
                    </CloudinaryContext>
                </Grid>
                <br />
                <br />
                <br />
                <br />
                <br />
            </div>
        );
    }
}

export default GameDirectory;

/*
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
                    */