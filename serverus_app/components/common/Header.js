import React from 'react';
import {Link, IndexLink} from 'react-router';
import Radium from 'radium';
import SidebarNav from './SidebarNav';

class Header extends React.Component {
    //Header might need state later on
    render(){
            return(
            <header style = {headerStyle.root}>
                    <nav style = {headerStyle.navStyle}>
                        <div style = {headerStyle.topMenu}>
                            <section style = {headerStyle.logoSection} onClick = {this.props.openNav}>
                                <i className="fa fa-bars" style = {headerStyle.logo}></i>
                            </section>
                        </div>
                    </nav>
            </header>
        );
    }
}

let headerStyle = {
    root: {
        display: "block",
        boxSizing: "border-box"
    },
    navStyle: {
        backgroundColor: "#3a3a3a",
        position: "static",
        display: "flex",
        width: "100%"
    },
    topMenu: {
        paddingLeft: "8px",
        paddingRight: "8px",
        marginLeft: "auto",
        marginRight: "auto",
        justifyContect: "space-between",
        display: "flex",
        width: "100%",
        margin: "0",
        padding: "0",
        direction: "ltr",
        boxSizing: "border-box"
    },
    logoSection: {
        justifyContect: "flex-start",
        alignItems: "stretch",
        display: "flex"
    },
    logo: {
        border: "none",
        alignSelf: "center",
        color: "white",
        fontSize: "20px"
    }
};
export default Header;