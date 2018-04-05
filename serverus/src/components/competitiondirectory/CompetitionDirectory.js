import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Grid, Card, Header } from "semantic-ui-react";

class CompetitionDirectory extends Component{
    render(){
        return(
            <div>
                <Grid>
                    <Grid.Column width={3}>
                        <Card fluid>
                            <Card.Content>
                                <Header>Competitions</Header>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        Competitions Cards Here
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {

    };
}

const mapDispatchToProps = dispatch => {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(CompetitionDirectory)