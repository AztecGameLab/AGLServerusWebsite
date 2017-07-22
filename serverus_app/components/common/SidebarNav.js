import React from 'react';
import {Link} from 'react-router';

const SidebarNav = (props) => {
        var styleTogg = props.navBarIsOn == true ? sidebarStyle.rootOn : sidebarStyle.rootOff;
        return (
            <div style = {styleTogg}>
                <Link 
                    to = "about" 
                    style = {sidebarStyle.menuElement}>
                    About
                </Link>
                <Link 
                    to = "games" 
                    style = {sidebarStyle.menuElement}>
                    Games
                </Link>
                
            </div>
        );
}

var sidebarStyle = {
    rootOff: {
        height: "100%",
        width: 0,
        position: "fixed",
        zIndex: 1,
        top: 0,
        left: 0,
        backgroundColor: "#111",
        overflowX: "hidden",
        transition: "0.5s",
        paddingTop: "60px",
        transitionDuration:  ".2s", 
        transitionTimingFunction: "ease-out" 
    },
    rootOn: {
        height: "100%",
        width: 250,
        position: "fixed",
        zIndex: 1,
        top: 0,
        left: 0,
        backgroundColor: "#111",
        overflowX: "hidden",
        transition: "0.5s",
        paddingTop: "60px",
        transitionDuration:  ".2s", 
        transitionTimingFunction: "ease-out" 
    },
    menuElement: {
        padding: "8px 8px 8px 32px",
        textDecoration: "none",
        fontDize: "25px",
        color: "#818181",
        display: "block",
        transition: "0.3s",

        ':hover': {
            color: "#f1f1f1"
        }
    }

}
export default SidebarNav;