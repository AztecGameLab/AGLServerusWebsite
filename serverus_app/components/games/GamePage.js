import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { GetGamePost } from '../AGL';
import PreviewGame from './PreviewGame';

class GamePage extends Component {
    constructor(props) {
        super(props);
        this.isPageMounted = true;
        this.state = {
            loggedIn: false,
            gamePostData: {},
            edit: false,
        };
    }

    async componentWillMount() {
        if (this.props.match.params.gameId) {
            let gamePost = await GetGamePost("all", this.props.match.params.gameId);
            this.setState({
                gamePostData: gamePost
            });
        } else {
            this.setState({
                gamePostData: this.props.gamePostData,
                edit: this.props.edit
            });
        }
    }

    render() {
        return (
            <Grid style={{ marginTop: 0 }}>
                <PreviewGame gamePostData={this.state.gamePostData} edit={this.state.edit} />
            </Grid>
        );
    }
}

export default GamePage;