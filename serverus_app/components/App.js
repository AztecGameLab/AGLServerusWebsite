import React, {PropTypes} from 'react';
import SidebarNav from './common/SidebarNav';
import HeaderMenu from './common/HeaderMenu';
import LoginModel from './login/LoginModel';
require('../../favicon.ico');

export default class App extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            modelIsOpen: false,
            activeIndex: 0
        };
    this.openLogin = this.openLogin.bind(this);
    this.closeLogin = this.closeLogin.bind(this);
    this.changeTabIndex = this.changeTabIndex.bind(this);
    }
    openLogin(activeIndex) {
        this.changeTabIndex(activeIndex);
        this.setState({
            modelIsOpen: true
        });
    }
    changeTabIndex(activeIndex){
        this.setState({
            activeIndex:activeIndex
        });
    }
    closeLogin() {
        this.setState({
            modelIsOpen: false
        });
    }

    render() {
    var modal;
        return (
            <div>
            <HeaderMenu showModel = {this.openLogin}/>
                <div style = {AppStyle.root}>
                    <SidebarNav navBarIsOn = {this.state.navBarIsOn} content ={this.props.children}/>
                </div>
            <LoginModel activeIndex = {this.state.activeIndex} isOpen = {this.state.modelIsOpen} close = {this.closeLogin} changeTab = {this.changeTabIndex}/>
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

