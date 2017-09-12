import React from 'react';
import {Link} from 'react-router';
import { Button, Icon, Image } from 'semantic-ui-react'
import styles from './footer.css';

class Footer extends React.Component {
    constructor(props){
        super(props);
        this.RedirectToHellSite = this.RedirectToHellSite.bind(this);
    }

    RedirectToHellSite(e){
        window.location.href= "https://www.sdsu.edu/";
    }

    render(){
        let logo = require('./../login/blacklogo.png');
        return (
            <div id="footer">
                <Image style={FooterStyle.logo} src={logo} />
                <Image style={FooterStyle.sdsuImage} src='https://newscenter.sdsu.edu/brand/images/primary2color.gif' onClick={this.RedirectToHellSite}/>
                <div id="footer-right">
                    <div id="footer-right-top">
                        <Icon name='mail outline'/> Contact us at: <a href='mailto:aztecgamelab@gmail.com'>aztecgamelab@gmail.com</a>
                    </div>
                    <div id="footer-right-bottom">
                        <Icon name='share alternate'/> Follow us on&nbsp;
                        <Button icon color='instagram' circular compact as='a' href="https://www.instagram.com/aztecgamelab/"><Icon name='instagram'/></Button>
                        <Button icon color='facebook' circular compact as='a' href="https://facebook.com"><Icon name='facebook f'/></Button>
                        <Button icon color='twitter' circular compact as='a' href="https://twitter.com/AztecGameLab"><Icon name='twitter' /></Button>
                        <Button icon color='youtube' circular compact><Icon name='youtube' /></Button>
                    </div>
                </div>
            </div>
        );
    }
};
var FooterStyle = {
    logo: {
        display: 'block',
        width: 'auto',
        maxHeight: '100%',
        float: 'left',
    },
    sdsuImage: {
        display: 'block',
        width: 'auto',
        maxHeight: '100%',
        float: 'right',
    },
}

export default Footer;