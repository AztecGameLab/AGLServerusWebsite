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
                <HeaderMenu showModel = {this.openLogin}></HeaderMenu>
                <div style={AppStyle.mainContent}>{this.props.children}</div>
            </div>
        );
    }
}

var AppStyle = {

    mainContent: {
        color: 'white',
        marginLeft: 0,
        fontSize: '1.5em',
        zIndex: 1
    }
};

App.propTypes = {
    children: PropTypes.object
};

