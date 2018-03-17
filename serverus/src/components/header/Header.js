// React + React-Redux + Router
import React, { Component } from 'react';
import { Link, Router } from "react-router-dom";
import { history } from "../../features/API/History_API/historyFunctions";
import { bindActionCreators } from "redux";
import { openLoginModal } from '../../features/login/loginAction';
import { connect } from 'react-redux';
// Components
import { Icon, Modal, Menu, Button } from "semantic-ui-react";
import { Image as CloudImage, CloudinaryContext } from "cloudinary-react";
import LoginModal from '../register/LoginModal';
import SignUp from '../register/SignUpModal';


// Create list of Menu Items with settings
const MenuObjects = [
  { name: "Competitions", logo: "trophy", route: "/competitions" },
  { name: "Game Directory", logo: "gamepad", route: "/games" },
  { name: "User Directory", logo: "users", route: "/users" },
  { name: "Resources", logo: "cubes", route: "/resources" },
];

class Header extends Component {

  // Construct Menu Item Components using list
  MenuItemComponents = MenuObjects.map(obj => {
    return (
      <Menu.Item key={obj.name} as={Link} to={obj.route}>
        <Icon size="big" name={obj.logo} />
        {obj.name}
      </Menu.Item>
    );
  });

  render() {
    return (
      <Router history={history} >
        <Menu secondary stackable borderless>
          <Menu.Item key="home" as={Link} to="/">
            <CloudinaryContext cloudName="aztecgamelab-com">
              <CloudImage publicId="WebsiteAssets/blacklogo.png" />
            </CloudinaryContext>
          </Menu.Item>

          {this.MenuItemComponents}

          <Menu.Menu position="right">
            <Menu.Item name="Login">
              <Modal trigger={<Button>Login</Button>}>
              <LoginModal/>
              </Modal>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </Router>
    );
  };
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openLoginModal: bindActionCreators(openLoginModal, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
