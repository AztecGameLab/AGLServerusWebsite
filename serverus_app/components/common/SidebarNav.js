import React, { Component } from 'react';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react';
import { Link } from 'react-router';

class SidebarNav extends Component {
  state = { visible: false }

  toggleVisibility = () => {
    this.setState(prevState => ({ visible: !prevState.visible }))
  };

  // checkSidebarState = () => {
  //   if (this.state.visible) {
  //     this.setState({
  //       visible: false
  //     })
  //   }
  // };


  render() {
    const { visible } = this.state;
    return (
      <div>
        {/* <Icon name="bars" onClick={this.toggleVisibility}></Icon> */}
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation='overlay' width='thin' visible={true} icon='labeled' vertical inverted>
            <Link to="/">
              <Menu.Item onClick="" name='home'>
                <Icon name='home' />
                Home
              </Menu.Item>
            </Link>
            <Link to="games">
              <Menu.Item onClick="" name='gamepad'>
                <Icon name='gamepad' />
                Games
              </Menu.Item>
            </Link>
            <Link to="competitions">
              <Menu.Item onClick="" name='camera'>
                <Icon name='camera' />
                Channels
              </Menu.Item>
            </Link>
            <Link style={{cursor:'pointer'}} onClick={this.toggleVisibility}>
              <Menu.Item name="blogs">
                <Icon name='newspaper' />
                Blog
            </Menu.Item>
              <Sidebar.Pushable style={{ height: '150px', overflow: 'hidden' }}>
                <Sidebar style={sideBar.subBar} animation='push' direction='top' visible={visible}>
                  <Menu.Menu>
                    <Link to="markdown">
                      <Menu.Item name="create">Create Blog post</Menu.Item>
                    </Link>
                    <Link to="markdown">
                      <Menu.Item name="view">View blog posts</Menu.Item>
                    </Link>
                  </Menu.Menu>
                </Sidebar>
                <Sidebar.Pusher style={sideBar.nextBar}>
                  <Link to="competitions">
                    <Menu.Item name='camera'>
                      <Icon name='camera' />
                      Suh
                  </Menu.Item>
                  </Link>
                </Sidebar.Pusher>
              </Sidebar.Pushable>
            </Link>
          </Sidebar>
          <Sidebar.Pusher>
            <div style={sideBar.mainContent}>{this.props.content}</div>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}

var sideBar = {
  mainContent: {
    height: "100vh",
    marginLeft: '150px',
    backgroundColor: 'black',
    color: 'white',
    fontSize: '1.5em'
  },
  nextBar: {
    width: '140px',
    marginLeft: '5px',
    // bottom: '48px'
  }
};

export default SidebarNav;