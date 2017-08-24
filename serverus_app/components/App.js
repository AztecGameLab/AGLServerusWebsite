import React, {PropTypes} from 'react';
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
                <HeaderMenu showModel = {this.openLogin}></HeaderMenu>
                <div style={AppStyle.mainContent}>{this.props.children}</div>
                <LoginModel activeIndex = {this.state.activeIndex} isOpen = {this.state.modelIsOpen} close = {this.closeLogin} changeTab = {this.changeTabIndex}/>
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

