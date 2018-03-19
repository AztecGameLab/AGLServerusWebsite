import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Grid, List } from 'semantic-ui-react';
import {Image, CloudinaryContext} from "cloudinary-react";
const Footer = () => {
    return (
        <div style={FooterStyle.footer}>
            <Grid centered inverted >
                <Grid.Row>
                <CloudinaryContext cloudName="aztecgamelab-com">
                <Image publicId="WebsiteAssets/blacklogo.png" />
                    </CloudinaryContext>
                </Grid.Row>
                <Grid.Row>
                <div style={FooterStyle.spacing}>
                    <Button icon color='youtube play' circular  as='a' href="https://www.youtube.com/channel/UCt7fJA18qugGlVDaFrt63JQ"><Icon name='youtube play' /></Button>
                </div>
                <div style={FooterStyle.spacing}>
                    <Button icon color='facebook' circular  as='a' href="https://www.facebook.com/groups/aztecgamelab/"><Icon name='facebook f' /></Button>
                </div>
                <div style={FooterStyle.spacing}>
                    <Button icon color='instagram' circular  as='a' href="https://www.instagram.com/aztecgamelab/"><Icon name='instagram' /></Button>
                </div>
                <div style={FooterStyle.spacing}>
                    <Button icon color='twitter' circular  as='a' href="https://twitter.com/AztecGameLab"><Icon name='twitter' /></Button>
                </div>
                </Grid.Row>
                
                <br/><br/>
                <Grid.Row>
                <List divided relaxed horizontal inverted>
                    <List.Item icon='info circle' content='General Body Meetings:' />                                            
                    <List.Item icon='map signs' content={<a href='http://www.myatlascms.com/map/index.php?id=801#!s/key=adams?m/146395?ce/12160'>Adams Humanities 1120</a>} />  
                    <List.Item icon='time' content='Fridays at 1:00pm - 3:00pm' />                                            
                </List>
                </Grid.Row>
                <Grid.Row>
                <br/>
                <List divided relaxed horizontal inverted>
                    <List.Item icon='law' content={<a href='https://docs.google.com/document/d/1R6tGpquyGkJQlrIz-iO-xCoMH5pjsymbRFWiCd6qYQ4/edit?usp=sharing'>Terms & Conditions</a>} />  
                    <List.Item icon='university' content={<a href='http://www.cs.sdsu.edu/'>San Diego State University</a>} />  
                    <List.Item icon='copyright' content= 'Aztec Game Lab 2018' />  
                </List>
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