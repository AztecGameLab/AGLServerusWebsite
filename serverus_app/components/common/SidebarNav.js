import React, { Component } from 'react';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react';
import { Link } from 'react-router';

class SidebarNav extends Component {
  render() {
    return (
            <div style={sideBar.mainContent}>{this.props.content}</div>
    )
  }
}

var sideBar = {
  mainContent: {
    height: "100vh",
    backgroundColor: 'black',
    color: 'white',
    fontSize: '1.5em'
  }
};

export default SidebarNav;