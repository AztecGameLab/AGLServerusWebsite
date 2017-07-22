import React, {PropTypes} from 'react';
import Header from './common/Header';
import SidebarNav from './common/SidebarNav';

export default class App extends React.Component{

    state = {
        navBarIsOn: false
    };

    openNav = () => {
        this.setState(prevState => ({
            navBarIsOn: !prevState.navBarIsOn
        }));
    };

    render() {
        const {
            navBarIsOn
        } = this.state;
    
        var currentStyle = navBarIsOn == true ? AppStyle.rootPushed : AppStyle.root;
        return (
            <div>
            <SidebarNav navBarIsOn = {this.state.navBarIsOn}/>
                <div style = {currentStyle}>
                    <Header openNav = {this.openNav}/>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

var AppStyle = {
    root: {
        padding: "16px",
        marginLeft: 0,
        transitionDuration:  ".2s", 
        transitionTimingFunction: "ease-out" 
    },
    rootPushed: {
        padding: "16px",
        marginLeft: 250,
        transitionDuration:  ".2s", 
        transitionTimingFunction: "ease-out" 
    }
}

App.propTypes = {
    children: PropTypes.object
};

