import React, { Component } from 'react';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react';

class SidebarNav extends Component {
  // state = { visible: false }

  // toggleVisibility = () => {
  //   this.setState(prevState =>({ visible: !prevState.visible }))
  // };

  // checkSidebarState = () => {
  //   if (this.state.visible) {
  //     this.setState({
  //       visible: false
  //     })
  //   }
  // };

  render() {
    // const { visible } = this.state;
    return (
      <div>
        {/* <Icon name="bars" onClick={this.toggleVisibility}></Icon> */}
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation='overlay' width='thin' visible={true} icon='labeled' vertical inverted>
            <Menu.Item name='home'>
              <Icon name='home' />
              Home
            </Menu.Item>
            <Menu.Item name='gamepad'>
              <Icon name='gamepad' />
              Games
            </Menu.Item>
            <Menu.Item name='camera'>
              <Icon name='camera' />
              Channels
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            <div style = {mainContent}>{this.props.content}</div>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}

var mainContent = {
  height: "100vh",
  marginLeft: '150px',
  backgroundColor: 'black',
  color: 'white',
  fontSize: '1.5em'
};

export default SidebarNav;