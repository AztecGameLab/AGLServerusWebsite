import React from 'react';
import Link from 'react-router';
import { Button, Icon, Image } from 'semantic-ui-react'
import styles from './footer.css';

const Footer = (props) => {
    let logo = require('./../login/blacklogo.png');
    return (
        <div id="footer">
            <Image style={FooterStyle.logo} src={logo} />
            <Image style={FooterStyle.sdsuImage} src='https://newscenter.sdsu.edu/brand/images/primary2color.gif' />
            <div id="footer-right">
                <div id="footer-right-top">
                    <Icon name='mail outline'/> Contact us at <a href='mailto:aztecgamelab@gmail.com'>aztecgamelab@gmail.com</a>
                </div>
                <div id="footer-right-bottom">
                    <Icon name='share alternate'/> Follow us on&nbsp;
                    <Button icon color='facebook' circular compact><Icon name='facebook f'/></Button>
                    <Button icon color='twitter' circular compact><Icon name='twitter' /></Button>
                    <Button icon color='youtube' circular compact><Icon name='youtube' /></Button>
                </div>
            </div>
        </div>
    );
};
var FooterStyle = {
    logo: {
        display: 'block',
        width: 'auto',
        height: '100%',
        float: 'left',
    },
    sdsuImage: {
        display: 'block',
        width: 'auto',
        height: '100%',
        float: 'right',
    },
}

export default Footer;