import React from 'react';
import {Grid, Icon} from 'semantic-ui-react';
class CompetitionsPage extends React.Component {
    render() {
        return (
            <div>
            <br/><br/><br/><br/><br/><br/>
                <Grid centered columns = {3}>
                    <Grid.Column width = {4}>
                    </Grid.Column>
                    
                    <Grid.Column width = {8}textAlign = 'center'>
                        <h1 style = {{textAlign: 'center'}}> Aztec Game Lab's HALLOWEEN JAM</h1>
                        <h2> That means its time to get SPOOKY</h2>
                        <hr/>
                        <iframe src="https://giphy.com/embed/p7PU6lbV4Rq3C" width="480" height="436" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
                    </Grid.Column>
                    
                    <Grid.Column width = {4}>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default CompetitionsPage;