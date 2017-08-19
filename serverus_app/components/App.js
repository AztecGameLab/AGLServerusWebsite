import React, {PropTypes} from 'react';
import SidebarNav from './common/SidebarNav';
import HeaderMenu from './common/HeaderMenu';
import LoginModel from './login/LoginModel';
require('../../favicon.ico');

export default class App extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            modelIsOpen: false
        };
    this.openLogin = this.openLogin.bind(this);
    this.closeLogin = this.closeLogin.bind(this);
    }

    openLogin() {
        this.setState({
            modelIsOpen: true
        });
    }
    closeLogin() {
        this.setState({
            modelIsOpen: false
        });
    }

    render() {
        return (
            <div>
            <LoginModel isOpen = {this.state.modelIsOpen} close = {this.closeLogin}/>
            <HeaderMenu showModel = {this.openLogin}/>
                <div style = {AppStyle.root}>
                    <SidebarNav navBarIsOn = {this.state.navBarIsOn} content ={this.props.children}/>
                </div>
            </div>
        );
    }
}

var AppStyle = {
    root: {
        marginLeft: 0,
        transitionDuration:  ".2s", 
        transitionTimingFunction: "ease-out", 
        height: "100vh"
    }
};

App.propTypes = {
    children: PropTypes.object
};

