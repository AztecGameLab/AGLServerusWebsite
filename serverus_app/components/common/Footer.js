import React from 'react';
import { Grid, Image } from 'semantic-ui-react'
import styles from './footer.css';

const Footer = (props) => {
    let logo = require('./AGL_banner_white_border_subtraction.jpg');
    return (
        <div id="footer">
            <Image style={FooterStyle.logo} src={logo} />
            <Image style={FooterStyle.sdsuImage} src='https://newscenter.sdsu.edu/brand/images/primary2color.gif' />
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