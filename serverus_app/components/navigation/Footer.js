import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Grid } from 'semantic-ui-react';

const Footer = (props) => {
    return (
        <div style={FooterStyle.footer}>
            <Grid centered divided inverted >
                <Grid.Row>
                    <h1>Aztec Game Lab</h1>
                </Grid.Row>
                <Grid.Row>
                <div style={FooterStyle.spacing}>
                    <Button icon color='instagram' circular  as='a' href="https://www.instagram.com/aztecgamelab/"><Icon name='instagram' /></Button>
                </div>
                <div style={FooterStyle.spacing}>
                    <Button icon color='facebook' circular  as='a' href="https://www.facebook.com/groups/aztecgamelab/"><Icon name='facebook f' /></Button>
                </div>
                <div style={FooterStyle.spacing}>
                    <Button icon color='twitter' circular  as='a' href="https://twitter.com/AztecGameLab"><Icon name='twitter' /></Button>
                </div>
                </Grid.Row>
                <Grid.Row textAlign='center'>
                    <Grid.Column width = {2}>
                        <a href='https://docs.google.com/document/d/1R6tGpquyGkJQlrIz-iO-xCoMH5pjsymbRFWiCd6qYQ4/edit?usp=sharing'> Terms & Conditions </a>
                    </Grid.Column>
                    <Grid.Column width = {2}> 
                        <a href='http://www.cs.sdsu.edu/'> San Diego State University</a>
                    </Grid.Column>
                    <Grid.Column width = {2}> 
                        <Icon name = 'copyright'> </Icon>AztecGameLab 2017 
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>

    );
};

var FooterStyle = {
    footer: {
        backgroundColor: ' #1b1c1d',
        color: 'white',
        bottom: 0,
        margin: 0,
        zIndex: 0,
        width: '100%',
        padding: '20px'

    },
    spacing: {
        marginLeft: '15px'
    }

}

export default Footer;