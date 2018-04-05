// React + React-Redux + Router
import React, { Component } from "react";
import { Link, Router } from "react-router-dom";
import { history } from "../../features/API/History_API/historyFunctions";
import { connect } from "react-redux";

// Components
import { Icon, Menu } from "semantic-ui-react";
import { Image as CloudImage, CloudinaryContext, Transformation } from "cloudinary-react";
import RegistrationModal from "../register/RegistrationModal";
import HeaderDropdown from "../usercomponents/headerdropdown/HeaderDropdown";

//Selectors
import { selectLoggedIn } from "../../features/auth/authSelectors";

// Create list of Menu Items with settings
const MenuObjects = [
  { name: "Competitions", logo: "trophy", route: "/competitions" },
  { name: "Game Directory", logo: "gamepad", route: "/games" },
  { name: "User Directory", logo: "users", route: "/users" },
  { name: "Sponsors", logo: "shield", route: "/sponsors"},
  { name: "About Us", logo: "info", route: "/aboutus"}
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
    const { loggedIn } = this.props;
    return (
      <Router history={history}>
        <Menu secondary stackable borderless>
          <Menu.Item key="home" as={Link} to="/">
            <CloudinaryContext cloudName="aztecgamelab-com">
              <CloudImage publicId="WebsiteAssets/Parallax/AGL_retro_parallax_layer2.png">
                <Transformation width="150" crop="scale" />
              </CloudImage>
            </CloudinaryContext>
          </Menu.Item>

          {this.MenuItemComponents}

          <Menu.Menu position="right">
            <Menu.Item>{loggedIn ? <HeaderDropdown /> : <RegistrationModal />}</Menu.Item>
          </Menu.Menu>
        </Menu>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: selectLoggedIn(state)
  };
};

export default connect(mapStateToProps, null)(Header);
